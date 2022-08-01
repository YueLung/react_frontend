import React, { useState, useEffect } from 'react';
import { Layout, Card, Spin } from 'antd';
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
		// data.forEach(element => {
		// 	element.products.forEach(x => x.key = x.id)
		// });
		setProductCategoryInfos(data);
		setIsLoading(false);
	}


	return (
		<>
			<Spin spinning={isLoading}>
				<Layout>
					<Content className="bg-white">
						{(productCategoryInfos !== null) && productCategoryInfos.map((productCategoryInfo) =>
							<Card title={productCategoryInfo.name}>
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