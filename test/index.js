const path = require('path');
const FileIo = require('../index');

// 读取
let packageData = FileIo.readFileSync(path.resolve(__dirname, '..'), 'package.json', true);
console.log(packageData);

// 写入
FileIo.writeFileSync(__dirname, 'output.json', {hello: '你好'}, true);