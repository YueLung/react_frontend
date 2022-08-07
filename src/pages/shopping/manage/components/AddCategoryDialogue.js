import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddCategoryDialogue = ({ visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);

  const onFinish = (values) => {
    setBtnLoading(true);
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
        form.resetFields();
        onCancel();
        onUpdate();
        setBtnLoading(false);
      });

  };

  return (
    <Modal
      visible={visible}
      title="新增種類"
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose={true}
    >
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off"
        initialValues={{
          name: null,
          price: null
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={btnLoading} style={{ width: '100%' }}>
            確認
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default AddCategoryDialogue;