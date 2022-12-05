import Plot from 'react-plotly.js';

interface HistogramChart {
  color: string;
  data: number[];
}

function HistogramChart({ color, data }: HistogramChart) {
  return (
    <Plot
      data={[
        {
          x: data,
          type: 'histogram',
        },
      ]}
      layout={{
        width: 300,
        height: 256,
        showlegend: false,
        margin: { l: 35, t: 0, r: 0, b: 0 },
        dragmode: false,
        colorway: [color],
        xaxis: {
          range: [0, 255],
        },
        yaxis: {
          gridcolor: 'rgba(255, 255, 255, 0.2)',
          zerolinecolor: 'rgba(255, 255, 255, 0.2)',
        },
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        font: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      }}
      config={{ staticPlot: true }}
    />
  );
}

export default HistogramChart;
