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
        width: 291,
        height: 256,
        showlegend: false,
        margin: { l: 35, t: 0, r: 0, b: 0 },
        dragmode: false,
        colorway: [color],
      }}
      config={{ staticPlot: true }}
    />
  );
}

export default HistogramChart;
