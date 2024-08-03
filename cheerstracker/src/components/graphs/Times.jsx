import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  {
    name: '2월',
    num: 40,
  },
  {
    name: '3월',
    num: 20,
  },
  {
    name: '4월',
    num: 30,
  },
  {
    name: '5월',
    num: 40,
  },
  {
    name: '6월',
    num: 45,
  },
  {
    name: '7월',
    num: 35,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="90%" height="80%">
        <BarChart
          width={0}
          height={0}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 25,
            bottom: 0,
          }}
        >
          
          <XAxis dataKey="name" stroke='#878787'/>
          <YAxis 
            domain={[0, 'dataMax + 4']}
            ticks={[0, 10, 20, 30, 40, 50]} 
            stroke='#878787'
          />
          <Tooltip />
          <Bar dataKey="num" fill="#BBCEFA" barSize={40} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
