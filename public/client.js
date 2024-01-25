async function rpcClient(details){
    const response = await fetch("https://rpcimplementation.onrender.com/rpc", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
         credentials: 'include',  
        body: JSON.stringify(details)
    })
    const result = await response.json()
    return result
}
