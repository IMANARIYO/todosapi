async function rpcClient(details){
    const response = await fetch("http://localhost:4445/rpc", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(details)
    })
    const result = await response.json()
    return result
}
async function performCalculation(operation, num1, num2) {
    const result = await rpcClient({
        type: operation,
        payload: { num1, num2 },
    });
    console.log(`${num1} ${operation} ${num2} = ${result}`);
}