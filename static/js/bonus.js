
function buildGauge(wFreq) {

    // Path setting by trigonometries for a dial on the gauge chart
    const degrees = 0.5 * (wFreq**2) - (24.5 * wFreq) +180;
    const radius = .5;
    const radians = degrees * Math.PI / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    const mainPath = 'M -.0 -0.035 L .0 0.035 L ',
          pathX = String(x),
          space = ' ',
          pathY = String(y),
          pathEnd = ' Z';
    
    const path = mainPath.concat(pathX,space,pathY,pathEnd);
    
    
    const dialGauge = {
      type: 'category',
      x: [0],
      y: [0],
      marker: {size: 28, color:'darkred'},
      showlegend: false,
      name: 'SPW',
      text: wFreq,
      hoverinfo: 'text+name'
      };
    
    // trace for pie chart to mimic gauge plot
    const traceGauge = {
      values: [1,1,1,1,1,1,1,1,1, 9],
      rotation: 90,    
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
      textinfo: 'text',
      textposition:'inside',      
      marker: {
        colors:['rgba(75, 188, 41, 0.9)',
                'rgba(75, 188, 41, 0.8)',
                'rgba(75, 188, 41, 0.7)',
                'rgba(75, 188, 41, 0.6)',
                'rgba(75, 188, 41, 0.5)', 
                'rgba(75, 188, 41, 0.4)',
                'rgba(75, 188, 41, 0.3)',
                'rgba(75, 188, 41, 0.2)',
                'rgba(75, 188, 41, 0.1)',
                'rgba(255, 255, 255, .5)']
              },
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    };
    
    
    const layoutGauge = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: 'darkred',
          line: {
            color: 'darkred'
          }
        }],
      title: '<b>Belly Button Washing Frequency (0-9)</b><br> <i>Scrubs per Week</i>',
      height: 500,
      width: 500,
      xaxis: {
        type:'category',
        zeroline:false,
        showticklabels:false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        type:'category',
        zeroline:false,
        showticklabels:false,
        showgrid: false,
        range: [-1, 1]
      }
    };
    
    const dataGauge = [dialGauge, traceGauge];
    
    Plotly.newPlot('gauge', dataGauge, layoutGauge, {responsive: true});
    }    