function buildMetadata(sample) {

  url = `/metadata/${sample}`
 
  const sampleMetaData = d3.select('#sample-metadata');

  // Clear any existing metadata
  sampleMetaData.html("");

  // fetch the metadata for a sample
  d3.json(url).then(metaData => {
    const uL = sampleMetaData.append('ul')
                             .style('padding-left', '20px')
                             .style('overflow-wrap', 'break-word');

    Object.entries(metaData).forEach(function([key, value]) {
      const newLi = uL.append('li');
      newLi.text(`${key}: ${value}`);
    })

    // Show a gauge chart
    buildGauge(metaData.WFREQ);

  });
 
}

function buildCharts(sample) {
  url = `/samples/${sample}`
// @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(sampleData => {
    // console.log(sampleData);

    // Pie Chart using the sample data
    const tracePie = {
      values: sampleData.sample_values.slice(0, 10),
      labels: sampleData.otu_ids.slice(0, 10),
      hovertext: sampleData.otu_labels.slice(0, 10),
      hovertemplate: '<i style="float: left;">OTU label</i>: %{text}' + '<extra></extra>',
      type: 'pie'
    };
    const layoutPie = {
      title: '<b>Top 10 OTU IDs by sample</b>',
      hovermode: 'closest',
      height: 500,
      width: 500
    }
    const dataPie = [tracePie];
    Plotly.newPlot('pie', dataPie, layoutPie, {responsive: true});


    // Bubble Chart using the sample data
    const traceBubble = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      hovertemplate: '(%{x}, %{y})<br>' + '%{text}', //'<i style="float: left;">OTU label</i>: %{x}, %{y}, %{text}' + '<extra></extra>',
      mode: 'markers',
      marker: {
        color: sampleData.otu_ids,
        size: sampleData.sample_values
      }
    }

    const layoutBubble = {
      xaxis: {
        title: 'OTU_ID'
      },
      yaxis: {
        title: 'Sample Values'
      }
    }
    
    const dataBubble = [traceBubble];
    Plotly.newPlot('bubble', dataBubble, layoutBubble, {responsive: true});
  });
}

function init() {
// Grab a reference to the dropdown select element
var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/names").then((sampleNames) => {
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Use the first sample from the list to build the initial plots
  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});
}

function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);
}

// Initialize the dashboard
init();
