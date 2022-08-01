import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

const ModifyCategoryDialogue = ({ product, visible, onCancel, onUpdate }) => {
  const onFinish = (values) => {
    fetch(`${process.env.REACT_APP_END_POINT}/trial/product/${product.id}/`,
      {
        method: "PUT",
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

  if (!product)
    return;
  else
    return (
      <Modal visible={visible} title="編輯商品" onCancel={onCancel} footer={null} centered>
        <Form name="basic" onFinish={onFinish} autoComplete="off"
          initialValues={{
            name: product.name,
            price: product.price
          }}>
          <Form.Item label="名稱" name="name" rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="價格" name="price" rules={[
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

export default ModifyCategoryDialogue;