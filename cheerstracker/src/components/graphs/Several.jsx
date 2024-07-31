import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  {
    name: '2월',
    num: 18,
  },
  {
    name: '3월',
    num: 20,
  },
  {
    name: '4월',
    num: 10,
  },
  {
    name: '5월',
    num: 12,
  },
  {
    name: '6월',
    num: 8,
  },
  {
    name: '7월',
    num: 14,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="89%" height="80%">
        <BarChart
          width={0}
          height={0}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 25,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" stroke='#878787'/>
          <YAxis 
            domain={[0, 25]}
            ticks={[0, 5, 10, 15, 20, 25]} // 5단위로 눈금 설정
            stroke='#878787'
          />
          <Tooltip />
          <ReferenceLine y={4} stroke="#BBCEFA" strokeDasharray="3 3" /> 
          <ReferenceLine y={8} stroke="#BBCEFA" strokeDasharray="3 3" /> 
          <Bar dataKey="num" fill="#BBCEFA" barSize={15} activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
