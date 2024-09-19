function stakeholdersGetShow(typea, typeb){
    const url = 'http://140.203.154.253:8016/aspect/stakeholders/';
    const headers = { 'Content-Type': 'application/json' };
    const payload = {};
    const data = {"jsonrpc" : "2.0", "params":{}};
    console.log(typea,typeb);
    fetch(url, {
        method: 'POST',
        mode:"cors",
        headers: headers,
        body: JSON.stringify(payload)
        // data:data
    })
    .then(response => response.json())
    .then(data => console.log('Success:', JSON.stringify(data, null, 2)))
    .catch(error => console.error('Error:', error));
}