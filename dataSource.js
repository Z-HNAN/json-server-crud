/*
 * 模拟数据源
 * 
 * 专门进行数据库交互的模块
 * 此处的数据库是利用了一个文件模拟的
 * 
 * */
let config = require('./config')
let path = require('path')


let fs = require('fs')

//let dbPath = '../../db.json'		// test path
let dbPath = './db.json'

// 查询模块
exports.find = function(objectName, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback && callback(err)
    }
    // 读取成功
    callback && callback(null, JSON.parse(data)[objectName])
  })
}
exports.findById = function(objectName, id, callbcak) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback && callback(err)
    }
    // 读取成功
    let objects = JSON.parse(data)[objectName]
    let object = objects.find(item => parseInt(item.id) === parseInt(id))
    // 排空情况
    object = object ? object : {}
    callbcak && callbcak(null, object)
  })
}

// 添加模块
exports.add = function(objectName, newObject, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback && callback(err)
    }
    // 读取成功
    let objects = JSON.parse(data)[objectName]
    // 设置新的student,并同步数据
    if (objects.length <= 0) {
      // 此时为一个空的表
      newObject.id = 0
    } else {
      // 至少有一个元素了
      newObject.id = parseInt(objects[objects.length - 1].id) + 1
      // 规范newObject
      for (key in objects[0]) {
        newObject[key] = newObject[key] ? newObject[key] : ''
      }
    }

    objects.push(newObject)
    // 同步数据库
    updateDB(objectName, objects, newObject, callback)
  })
}

// 修改模块
exports.update = function(objectName, newObject, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback && callback(err)
    }
    // 读取成功
    let objects = JSON.parse(data)[objectName]
    // 寻找对象
    let oldObject = objects.find(item => parseInt(item.id) === parseInt(newObject.id))
    if (!oldObject) {
      return callback && callback(null, {})
    }
    // 拷贝指定对象
    for (key in oldObject) {
      if (newObject[key]) {
        // 只有key更新了才去修改，否则直接跳过
        oldObject[key] = newObject[key]
      }
    }
    // 同步数据
    updateDB(objectName, objects, oldObject, callback)
  })
}

// 删除模块
exports.remove = function(objectName, id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
      return callback && callback(err)
    }
    // 读取成功
    let objects = JSON.parse(data)[objectName]
    // 寻找指定id学生的index
    let removeObjectIndex = objects.findIndex(item => parseInt(item.id) === parseInt(id))
    if (removeObjectIndex === -1) {
      let obj = {}
      obj[objectName] = "{}"
      return callback && callback(null, obj)
    }
    // 删除学生
    outObject = objects.splice(removeObjectIndex, 1)
    updateDB(objectName, objects, outObject, callback)
  })
}

/**
 * 更新学生信息
 * @param {Object} objects 对象集合
 */
let updateDB = function(objectName, objects, outObject, callback) {

  let srcDate = {}
  // 先获取所有的内容，然后更具指定的要求进行替换
  fs.readFile(path.join(__dirname, dbPath), "utf-8", (err, data) => {
    if (err => callback && callback(err)) 
    srcDate = JSON.parse(data)
    // 替换新修改的数据
    srcDate[objectName] = objects
    let srcDateStr = JSON.stringify(srcDate)
    // 写入数据
    fs.writeFile(path.join(__dirname, dbPath), srcDateStr, function(err) {
      if (err) {
        return callback && callback(err)
      }
      callback && callback(null, outObject)
    })
    
  })
  
}
