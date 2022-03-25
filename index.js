require('marko/node-require').install();
const lasso = require('lasso');
const express = require('express');
const dwebTemplate = require('./src/dweb.marko');
const mwebTemplate = require('./src/mweb.marko');
const dwebNoLHNTemplate = require('./src/dweb-noLHN.marko');
const editorialdwebTemplate = require('./src/editorial-dweb.marko');
const editorialmwebTemplate = require('./src/editorial-mweb.marko');
const baymaxmwebTemplate = require('./src/baymax-mweb.marko');

const fs = require('fs');
const TEST_DATA_PATH = './src/test-data/test.html';

const app = express();

let transforms;
if (process.env.NODE_ENV === 'production') {
    transforms = [{ transform: 'lasso-babel-transform' }];
}

lasso.configure({
    outputDir: `${__dirname}/static`,
    plugins: ['lasso-marko', 'lasso-less'],
    require: { transforms },
});

app.use(require('lasso/middleware').serveStatic());
app.use(express.static(__dirname));

app.get('/dweb', (req, res) => {
    const lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    req.lassoFlags = lassoFlags.concat('isLarge');
    const html = getTestData();
    dwebTemplate.render({ html }, res);
});
app.get('/editorial-dweb', (req, res) => {
    const lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    req.lassoFlags = lassoFlags.concat('isLarge');
    const html = getTestData();
    editorialdwebTemplate.render({ html }, res);
});
app.get('/dweb-nolhn', (req, res) => {
    const lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    req.lassoFlags = lassoFlags.concat('isLarge');
    const html = getTestData();
    dwebNoLHNTemplate.render({ html }, res);
});
app.get('/mweb', (req, res) => {
    req.lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    const html = getTestData();
    mwebTemplate.render({ html }, res);
});
app.get('/editorial-mweb', (req, res) => {
    req.lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    const html = getTestData();
    editorialmwebTemplate.render({ html }, res);
});
app.get('/baymax-mweb', (req, res) => {
    req.lassoFlags = ['ebayui-no-bg-icons', 'ds6'];
    const html = getTestData();
    baymaxmwebTemplate.render({ html }, res);
});

app.listen(3000, () => {
    if (process.send) {
        process.send('online'); // browser-refresh
    }
});

function getTestData() {
    let html = '';
    try {
        html = fs.readFileSync(require.resolve(TEST_DATA_PATH), { encoding: 'utf8' });
    } catch (err) {
        console.log(`Testing file read failed, error = ${JSON.stringify(err)}`);
        html = '';
    }
    return html;
}