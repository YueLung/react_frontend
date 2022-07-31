import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddProductDialogue = ({ category, visible, onCancel, onUpdate }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    values.category = category;
    fetch(`${process.env.REACT_APP_END_POINT}/trial/product/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        onCancel();
        onUpdate();
      });
  };

  return (
    <Modal
      visible={visible}
      title="新增商品"
      centered
      onCancel={onCancel}
      footer={null}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="名稱"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="價格"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input your price!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            確認
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddProductDialogue;