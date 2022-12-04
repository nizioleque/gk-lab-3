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
        width: 293,
        height: 256,
        showlegend: false,
        margin: { l: 37, t: 0, r: 0, b: 0 },
        dragmode: false,
        colorway: [color],
        xaxis: {
          range: [-1, 256],
        },
      }}
      config={{ staticPlot: true }}
    />
  );
}

export default HistogramChart;
