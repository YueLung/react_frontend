import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Spin, Card, Table } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AddCategoryDialogue from './components/AddCategoryDialogue';
import AddProductDialogue from './components/AddProductDialogue';
import ModifyCategoryDialogue from './components/ModifyCategoryDialogue';


const ManagePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productCategoryInfos, setProductCategoryInfos] = useState(null);
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null);
  const [modifyProductModalVisible, setModifyProductModalVisible] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);

  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '圖片',
      dataIndex: 'photo',
      key: 'photo',
    },
    {
      title: '編輯',
      render: (_, product) => (
        <Button type="primary" icon={<EditOutlined />} size="small"
          onClick={() => {
            // console.log(product)
            setClickedProduct(product);
            setModifyProductModalVisible(true);
          }}>
        </Button>
      ),
    }
  ];

  useEffect(() => {
    getData();
  }, [])

  let getData = async () => {
    setIsLoading(true);
    let response = await fetch(`${process.env.REACT_APP_END_POINT}/trial/productInfo`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
    let data = await response.json();
    data.forEach(element => {
      element.products.forEach(x => x.key = x.id)
    });
    // console.log(data)
    setProductCategoryInfos(data);
    setIsLoading(false);
  }

  return (
    <>
      <Spin spinning={isLoading}>
        <Button className='mb-2' onClick={() => { setAddCategoryModalVisible(true) }} type="primary" icon={<PlusOutlined />} >
          新增種類
        </Button>
        <Row gutter={[16, 16]}>
          {(productCategoryInfos !== null) &&
            productCategoryInfos.map((productCategoryInfo) =>
              <Col xs={24} lg={12} key={productCategoryInfo.id}>
                <Card title={productCategoryInfo.name}
                  extra={<Button type="primary" size="small" icon={<PlusOutlined />}
                    onClick={() => {
                      setClickedCategory(productCategoryInfo.id)
                      setAddProductModalVisible(true)
                    }}
                  >
                    新增商品
                  </Button>}
                >
                  <Table dataSource={productCategoryInfo.products} columns={columns} size="small">
                  </Table>
                </Card>
              </Col>
            )
          }
        </Row>
      </Spin >

      <AddCategoryDialogue visible={addCategoryModalVisible} onCancel={() => { setAddCategoryModalVisible(false) }} onUpdate={() => { getData() }} />
      <AddProductDialogue category={clickedCategory} visible={addProductModalVisible} onCancel={() => { setAddProductModalVisible(false) }} onUpdate={() => { getData() }} />
      {clickedProduct &&
        <ModifyCategoryDialogue product={clickedProduct} visible={modifyProductModalVisible} onCancel={() => { setModifyProductModalVisible(false) }} onUpdate={() => { getData() }} />
      }
    </>
  )
}

export default ManagePage;