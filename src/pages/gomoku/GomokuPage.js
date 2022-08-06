import React, { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './GomokuPage.css';
const { Option } = Select;


const GomokuPage = () => {
  const [tableLength, setTableLength] = useState(3);
  // console.log('GomokuPage');

  return (
    <>
      <Select
        defaultValue="3"
        style={{ width: 120 }}
        onChange={(value) => { setTableLength(+value); }}
      >
        <Option value="3">3x3</Option>
        <Option value="5">5x5</Option>
        <Option value="10">10x10</Option>
      </Select>

      <div id="goban">
        {
          Array.from(
            { length: tableLength },
            (_, i) => (
              <div className="row r-0" key={i}>
                {
                  Array.from(
                    { length: tableLength },
                    (_, j) => (
                      <div className="col" key={j}>
                        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                      </div>
                    ))
                }
              </div>
            ))
        }
      </div>
    </>
  )
}

export default GomokuPage;