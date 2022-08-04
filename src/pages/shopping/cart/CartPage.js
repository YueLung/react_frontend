import React, { useState, useEffect } from 'react';
import { Layout, Card, Spin, Col, Row } from 'antd';
import './CartPage.css';
const { Sider, Content } = Layout;

const CartPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [productCategoryInfos, setProductCategoryInfos] = useState(null);

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
		setProductCategoryInfos(data);
		setIsLoading(false);
	}


	return (
		<>
			<Spin spinning={isLoading}>
				<Layout>
					<Content className="bg-white">
						{(productCategoryInfos !== null) && productCategoryInfos.map((productCategoryInfo) =>
							<Card key={productCategoryInfo.id} title={productCategoryInfo.name} className="mb-2" size="small">
								<Row justify="space-between" gutter={[24, 16]}>
									{
										productCategoryInfo.products.map(product => (
											<Col xs={24} lg={12} key={product.id}>
												<Card size="small" title={product.name}>
													{product.price}
												</Card>
											</Col>
										))
									}
								</Row>
							</Card>
						)}
					</Content>
					<Sider className="bg-white">Sider</Sider>
				</Layout>
			</Spin>
		</>
	)
}

export default CartPage;