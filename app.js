let fs = require('fs')
let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')

let router = require('./router')
let config = require('./config')

const PORT = config.port

let app = express()


// 配置body-parser
// parse applcation/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 静态资源
app.use('/public', path.join(__dirname, './public'))

// 挂载路由
app.use(router)
	
/* 在这里修改端口 */
app.listen(PORT, function (err) {
	if (err) { 
		console.log('Server Error....');
	}
	console.log('Server running at port '+ PORT +'......');
})
