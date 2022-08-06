import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const ModifyCategoryDialogue = ({ product, visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: product.name,
      price: product.price
    });
  }, [product])

  const onFinish = (values) => {
    setBtnLoading(true);
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
        // console.log(data);
        onCancel();
        onUpdate();
        setBtnLoading(false);
      });
  };


  return (
    <Modal
      visible={visible}
      title="編輯商品"
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose={true}
    >
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
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
          <Button type="primary" htmlType="submit" loading={btnLoading} style={{ width: '100%' }}>
            確認
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModifyCategoryDialogue;