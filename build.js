const path = require('path')
const fs = require('fs')

//获取模板引擎实例
var template = require('art-template');


const config = require('./config')

// 初始化的domain组
const domainNames = config.objectNames
// config.objectNames.forEach((item, index) => {
//   domainNames.push(item.toString())
// })
// console.log(domainNames)
// // console.log()
// 

// 生成router
readFileData('./template/router-tpl.js')
.then(data => {
  // 渲染的模板数据
  data = template.render(data.toString(), {
    domainNames,
    isCros: config.isCros
    
  })
  // 写入到程序
  return writeFileData('./router.js', data)
})
.then(msg => {
  console.log('build success!')
})




/**
 * [通过Promise读取存储的数据]
 * @param  {String} file [文件名]
 * @return {Object}      [Promise对象]
 */
function readFileData (filename) {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        reject("read filedata error!");
      } else {
        resolve(data);
      }
    })
  });
  return promise;
}

/**
 * [通过Promise写入数据]
 * @param  {String} file [文件名]
 * @param  {Object} data  [写入的数据]
 * @return {Object}      [Promise对象]
 */
function writeFileData (filename, data) {
  let promise = new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, filename), data, function(err) {
      if (err) {
        reject("fail " + err)
      } else {
        resolve("write success!");
      }
    });
  })
  return promise;
}