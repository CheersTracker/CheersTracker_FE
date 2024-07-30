import React from 'react';

const DynamicWidthDiv = ({ value, maxValue }) => {
  // 데이터 값에 따라 width를 계산
  const width = `${(value / maxValue) * 100 + 300}px`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '36px', marginBottom: '2px' }}>
      <div 
        style={{ width, backgroundColor: 'color', height: '10px', transition: 'width 0.5s',
                borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}} />
      <span style={{ marginLeft: '10px', color: 'black'}}>{value}g</span> 
    </div>
  );
};

const Example = () => {
  // 지난달과 이번달 데이터 값
  const lastMonthData = 670; // 지난달 
  const thisMonthData = 470; // 이번달 
  const maxValue = Math.max(lastMonthData, thisMonthData, 800); // 최대값을 설정

  return (
    <div>
      <DynamicWidthDiv value={lastMonthData} maxValue={maxValue} color='#B4B4B4'/>
      
      <DynamicWidthDiv value={thisMonthData} maxValue={maxValue} color='#799AEA'/>
    </div>
  );
};

export default Example;
