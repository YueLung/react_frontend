import React, { useState } from 'react';

const ApiTest = () => {
    const [repo, setRepo] = useState();

    fetch(`${process.env.REACT_APP_END_POINT}/trial/api_test`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setRepo(data['data']);
            /*接到request data後要做的事情*/
        })
        .catch(e => {
            console.log(e);
        })

    return (
        <div>ApiTest {(repo === undefined) ? "目前還有沒有資料" : repo}</div>
    );
}

export default ApiTest