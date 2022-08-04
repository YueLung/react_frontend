import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './GomokuPage.css';

const GomokuPage = () => {


  return (
    <>
      GomokuPage
      <div id="goban">
        <div className="row r-0">
          <div className="col c-0">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </div>
          <div className="col c-1">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </div>
        </div>
        <div className="row r-1">
          <div className="col c-0">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </div>
          <div className="col c-1 ">
            <div className="w-100 h-100 flex justify-content-center align-items-center">
              <Button type="primary" shape="circle"> </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GomokuPage;