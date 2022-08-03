import React, { useState } from 'react';

const ApiTestPage = () => {
	const [recvData, setRepo] = useState();

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
			setRepo(data['data']);
		})
		.catch(e => {
			console.log(e);
		})

	return (
		<div>ApiTest {(recvData === undefined) ? "目前還有沒有資料..." : recvData}</div>
	);
}

export default ApiTestPage;