let express = require('express')
let fs = require('fs')
let url = require('url')

let objectDS = require('./dataSource')
let config = require('./config')

let router = express.Router()

let OBJECT_NAME = config.objectName

// 得到所有
router.get('/' + OBJECT_NAME, function(req, res) {
  objectDS.find(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error')
    }
    res.json(data)
  })
})

// 新增一条
router.post('/' + OBJECT_NAME, function(req, res) {
  if (JSON.stringify(req.body) === "{}") {return res.json({})}
  objectDS.add(req.body, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error')
    }
    res.json(data)
  })
})

// 得到指定
router.get('/' + OBJECT_NAME + '/:id', function(req, res) {
  let id = req.params.id
  objectDS.findById(id, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error')
    }
    res.json(data)
  })
})

// 删除指定
router.delete('/' + OBJECT_NAME + '/:id', function(req, res) {
  let id = req.params.id
  objectDS.remove(id, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send('Server Error')
    }
    res.json(data)
  })
})

// 修改指定学生
router.post('/' + OBJECT_NAME + '/:id', function(req, res) {
  const id = req.params.id
  // 拿到学生对象
  const newObeject = req.body
  newObeject.id = id
  objectDS.update(newObeject, function(err, data) {
    // 进行数据的跳转
    if (err) {
      res.status(500).send('Server Error')
    }
    res.json(data)
  })
})


// 导出router
module.exports = router
