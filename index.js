const http = require('http');
var dateNow = new Date();
var month_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const server = http.createServer((req, res) => {
    const str = JSON.stringify({
        data: 'Hello World!',
        year: dateNow.getFullYear(),
        month: month_en[dateNow.getMonth() - 1],
        date: dateNow.getDate(),
    },
        space='\t',
        space=2
    );

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': str.length
    });

    res.end(str);
});

server.listen(8000);