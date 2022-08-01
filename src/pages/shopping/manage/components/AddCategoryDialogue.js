import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddCategoryDialogue = ({ visible, onCancel, onUpdate }) => {
  const onFinish = (values) => {
    fetch(`${process.env.REACT_APP_END_POINT}/trial/productInfo/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        onCancel();
        onUpdate();
      });

  };

  return (
    <Modal visible={visible} title="新增種類" onCancel={onCancel} footer={null} centered>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item label="名稱" name="name" rules={[
          {
            required: true,
            message: 'Please input your name!',
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
    </Modal >
  )
}

export default AddCategoryDialogue;