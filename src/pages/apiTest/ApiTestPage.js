import React, { useState } from 'react';

const ApiTestPage = () => {
	console.log('enter ApiTestPage')
	const [recvData, setData] = useState(undefined);

	fetch(`${process.env.REACT_APP_END_POINT}/trial/api_test`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setData(data['data']);
		})
		.catch(e => {
			console.log(e);
			setData('Error!!! Not connect with backend');
		})

	return (
		<div>{(recvData === undefined) ? "目前還有沒有資料..." : recvData}</div>
	);
}

export default ApiTestPage;