const http = require('http');
const database = require('./database');

const routingTable = {
    '/phone'(searchParams) {
        const keyword = searchParams.get('kw');
        const finalKeyword = keyword === null ? '' : keyword;

        return database.phone
            .filter(modelName => modelName.includes(finalKeyword));
    },
    '/laptop'(searchParams) {
        const keywordList = [];

        for(const key of searchParams.keys()) {
            keywordList.push(key);
        }

        const keyword = searchParams.get('keyword');
        const filterKeyword = keyword === null ? '' : keyword;
        const filteredArray = database.laptop
        .filter(modelName => modelName.includes(filterKeyword));

        if(keywordList.includes('sortby')) {
            return filteredArray.sort().reverse();
        }

        return filteredArray;
    },
    '/router'() {
        return database.router;
    }
};

function notFound() {
    return null;
}

function route(pathname) {
    return pathname in routingTable ? routingTable[pathname] : notFound;
}

const EXAMPLE_ORIGIN = 'http://example.com';

http.createServer((req, res) => {
    const url = new URL(req.url, EXAMPLE_ORIGIN);
    const selector = route(url.pathname);

    res.setHeader('Content-Type', 'application/json');

    if (selector === notFound) {
        res.statusCode = 404;

        return res.end();
    }

    const result = selector(url.searchParams);
    const responseBody = JSON.stringify(result);

    res.statusCode = 200;
    res.end(responseBody)

}).listen(8000); 