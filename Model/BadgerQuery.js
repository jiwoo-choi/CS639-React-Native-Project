import base64 from 'base-64';

// AVOID PAINFUL REST API.
class BadgerQuery{ 

    constructor(){
    }

    query(query){
        return this.excutionPlan(query);
    }

    excutionPlan(query){
        
        if (query[2] === undefined) {
            query[2] = {};
        }
        if (query[0] === 'DELETE') {
            method = 'DELETE'
        } else if (query[0] === 'INSERT') {
            method = 'POST'
        } else if (query[0] === 'UPDATE') {
            method = 'PUT'
        } else if (query[0] === 'SELECT') {
            method = 'GET'
        } else {
        }

        //authRequired
        let authRequired = false;
        if (query[1][0] === 'login'){
            authRequired = true;
        }

        //nothingRequired
        let NotRequired = false;
        if (query[1][0] === 'foods' ||  (query[1][0] === 'users' &&  query[1].length == 1) ) {
            NotRequired = true;
        }
        
        //or token required.

        let url = query[1].join("/");
        const URL = 'https://mysqlcs639.cs.wisc.edu/' + url;

        console.log('=============URL REQUEST==============')
        console.log('URL REQUEST :' + URL);
        console.log('METHOD :' + method);
        console.log('========================')

        if (authRequired){
            return (id, pwd) => {
                return fetch(URL, {
                    method: method,
                    headers: new Headers({
                        "Authorization": `Basic ${base64.encode(`${id}:${pwd}`)}`
                      }),
                })
            }

        } else if (NotRequired) {

            if (method === "GET") {
                return () => {
                    return fetch(URL, {
                        method: method,
                    })
                }
            } else {
                return () => {
                    return fetch(URL, {
                        method: method,
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(query[2])
                    })
                }
            }

        } else {

            if (method === "GET") {
                return (TOKEN) => {
                    return fetch(URL, {
                        method: method,
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            "x-access-token": TOKEN
                          }),
                    })
                }
            } else {
                return (TOKEN) => {
                    return fetch(URL, {
                        method: method,
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            "x-access-token": TOKEN
                          }),
                        body: JSON.stringify(query[2])
                    })
                }
            }
        }        
    }
}

export default BadgerQuery;