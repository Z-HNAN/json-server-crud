let studentDS = require('./dataSource')

// 通过 find √

// studentDS.find(function(err, data) {
// 	if(err) {
// 		console.log(err);
// 	}
// 	console.log(data);
// })

// 通过 findById √

// studentDS.findById(1,function(err, data) {
// 	if(err) {
// 		console.log(err);
// 	}
// 	console.log(data);
// })


// 通过 add √

// let newStudent = {
// 	"gender": "3",
// 	"name": "小娃",
// 	"age": "1",
// 	"speciality": "特别的小"
// }
// studentDS.add(newStudent, function(err, data) {
// 	if(err) {
// 		console.log(err);
// 	}
//   console.log(data)
// })

// 通过 remove

// studentDS.remove(23, function(err, data) {
// 	if(err) {
// 		console.log(err);
// 	}
//   console.log(data)
// })


// 通过 update

// let newStudent = {
// 	"id": 22,
// 	"name": "小刚刚娃测试的"
// }
// studentDS.update(newStudent, function(err, data) {
// 	if(err) {
// 		console.log(err);
// 	}
//   console.log(data)
// })

// return 会影响其他的位置 返回了内存地址

//let arr = ["a", [1,2], "c"]
//console.log(arr);
//let ch = testReturn()
//ch[0] = 3
//console.log(arr);
//
//function testReturn () {
//	return arr[1]
//}
