//address: /api/login
//headers:'Conent-Type': 'application/json'
exports.post = (address, headers) => {
    headers['Content-Type'] = 'application/json';
    return fetch(address, {
        method: 'POST',
        headers: headers
    }).then((res) => {
        return new Promise((resolve, reject) => {
            res.json().then((jsonData) => {
                resolve({ ok: res.ok, status: res.status, jsonData });
            }).catch((err) => {
                reject(err);
            });
        })
    });

}