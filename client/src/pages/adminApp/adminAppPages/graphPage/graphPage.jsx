import { Paper, Title } from '@mantine/core';
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const generateRandomData = () => {
  const startDate = new Date('2023-08-01').getTime();
  const seriesData = {};

  const generateSampleData = (sampleName) => {
    const sampleData = [];
    for (let i = 0; i < 30; i++) {
      const randomDate = new Date(startDate + i * 24 * 60 * 60 * 1000); // Increment by a day
      const randomValue = (Math.random() * 20 + 5).toFixed(2); // Generate random value between 5 and 25
      sampleData.push({ x: randomDate.getTime(), y: parseFloat(randomValue) });
    }
    seriesData[sampleName] = sampleData;
  };

  generateSampleData('ControlePoids');
  // generateSampleData('SAMPLE_B');
  // generateSampleData('SAMPLE_C');

  return seriesData;
};

class ScatterGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seriesData: generateRandomData(),
    };
  }

  calculateStatistics(data) {
    const values = data.map(entry => entry.y); // Extract y-values
    return {
      max: Math.max(...values),
      min: Math.min(...values),
      mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    };
  }

  render() {
    const { seriesData } = this.state;

    const sampleNames = Object.keys(seriesData);

    return (
      <div>
        
        <ScatterChart width={600} height={400}>
          <CartesianGrid />
          <XAxis dataKey="x" type="number" scale="time" domain={['auto', 'auto']} />
          <YAxis dataKey="y" type="number" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {sampleNames.map(sampleName => (
            <Scatter key={sampleName} name={sampleName} data={seriesData[sampleName]} fill={`rgba(54, 162, 235, 0.7)`} />
          ))}
          {sampleNames.map(sampleName => {
            const statistics = this.calculateStatistics(seriesData[sampleName]);
            return (
              <React.Fragment key={sampleName}>
                <ReferenceLine y={statistics.max} stroke="red" label={`Max: ${statistics.max.toFixed(2)}`} />
                <ReferenceLine y={statistics.min} stroke="blue" label={`Min: ${statistics.min.toFixed(2)}`} />
                <ReferenceLine y={statistics.mean} stroke="green" label={`X̅: ${statistics.mean.toFixed(2)}`} />
              </React.Fragment>
            );
          })}
        </ScatterChart>
      </div>
    );
  }
}



export default function GraphPage() {
  return (
    <div>
      <Paper shadow="sm" radius="md" p="sm" withBorder my={20}>

      <Title>
        GraphPage
        </Title>
      <ScatterGraph />
      </Paper>
    </div>
  );
}
