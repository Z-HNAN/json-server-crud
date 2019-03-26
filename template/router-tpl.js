let express = require('express')

let objectDS = require('./dataSource')

let objectName = ''

let router = express.Router()


{{if isCros===true }}
// 设置跨域访问
router.all('/*', function (req, res, next) {
  // 此时是以api为开头的访问
  res.header('Access-Control-Allow-Origin', '*')
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
{{/if}}

{{each domainNames}}

// 设置objectDS操作的数据
router.all('/' + '{{ $value }}' + '/*', function (req, res, next) {
  objectName = '{{ $value }}'
  next()
})

// 得到所有
router.get('/' + '{{ $value }}', function(req, res) {
  objectDS.find(objectName, function(err, data) {
    if (err => res.status(500).send('Server Error')) 
    res.json(data)
  })
})

// 新增一条
router.post('/' + '{{ $value }}', function(req, res) {
  if (JSON.stringify(req.body) === "{}") {return res.json({})}
  objectDS.add(objectName, req.body, function(err, data) {
    if (err => res.status(500).send('Server Error')) 
    res.json(data)
  })
})

// 得到指定
router.get('/' + '{{ $value }}' + '/:id', function(req, res) {
  let id = req.params.id
  objectDS.findById(objectName, id, function(err, data) {
    if (err => res.status(500).send('Server Error')) 
    res.json(data)
  })
})

// 删除指定
router.delete( '/' + '{{ $value }}' + '/:id', function(req, res) {
  let id = req.params.id
  objectDS.remove(objectName, id, function(err, data) {
    if (err => res.status(500).send('Server Error')) 
    res.json(data)
  })
})

// 修改指定
router.post('/' + '{{ $value }}' + '/:id', function(req, res) {
  const id = req.params.id
  // 拿到学生对象
  const newObeject = req.body
  newObeject.id = id
  objectDS.update(objectName, newObeject, function(err, data) {
    // 进行数据的跳转
    if (err => res.status(500).send('Server Error')) 
    res.json(data)
  })
})

{{/each}}


// 导出router
module.exports = router
