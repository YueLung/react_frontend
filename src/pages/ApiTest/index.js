import React, { useState } from 'react';

const ApiTest = () => {
    const [repo, setRepo] = useState();

    fetch('http://127.0.0.1:8000/api_test', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setRepo(data['invalid']);
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