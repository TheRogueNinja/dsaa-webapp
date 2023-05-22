import React, { useState } from 'react';
import Plot from 'react-plotly.js'
function PlotRealImp({data}) {
    const input_data = data.graph_data;
  
    // Grid data
    const gridXYreal = data.gridXYreal;
    const grid_x = data.grid_x;
    const grid_y = data.grid_y;
  
    // Tick labels
    const x_text = data.x_text;
    const y_text = data.y_text;
    const zreal_z_text = data.zreal_z_text;
  
    // Data for scatter plot
    const scatterData = {
      x: input_data.map(item => item.Volt),
      y: input_data.map(item => item.Freq),
      z: input_data.map(item => item.Zreal),
      type: 'scatter3d',
      mode: 'markers',
      marker: {
        color: input_data.map(item => item.Volt),
        colorscale: [
          [0, '#C83200'],
          [1, '#00FF64']
        ],
        colorbar: {
          title: '<b>Cell potentail (V)</b>',
          len: 0.3,
          thickness: 20
        },
        showscale: true
      }
    };
  
    // Data for surface plot
    const surfaceData = {
      x: grid_x,
      y: grid_y,
      z: gridXYreal,
      type: 'surface',
      colorscale: [
        [0, '#0072B2'],
        [1, '#D55E00']
      ],
      colorbar: {
        title: '<b>Z<sub>r</sub></b>',
        len: 0.4,
        thickness: 20,
        orientation: 'h'
      },
      showscale: true
    };
  
    // Layout configuration
    const layout = {
      title: '<b>Regression surface for real impedance</b>',
      scene: {
        xaxis: {
          title: '<b><i>Cell potential (Volt)</i></b>',
          ticktext: x_text.map(label => `<b>${label}</b>`),
          tickvals: x_text
        },
        yaxis: {
          title: '<b><i>Frequency (Hz)</i></b>',
          ticktext: y_text.map(label => `<b>${label}</b>`),
          tickvals: y_text
        },
        zaxis: {
          title: '<b><i>Z<sub>r</sub></i></b>',
          ticktext: zreal_z_text.map(label => `<b>${label}</b>`),
          tickvals: zreal_z_text
        }
      }
    };
  
    return (
      
      <Plot
        data={[scatterData, surfaceData]}
        layout={layout}
        style={{ width: '100%', height: '750px' }}
      />
    );
  }

  export default PlotRealImp;