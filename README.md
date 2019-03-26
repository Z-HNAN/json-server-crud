## 基于一个db.json，实现简单的CURD的操作:yum:

#### 1.1.0更新说明
1. 增加了多个数据源的访问
2. 开放了public的静态资源文件夹



#### 起步
1. 命令:`git clone https://github.com/Z-HNAN/json-server-crud.git` 整个项目。
2. 命令:`npm install` 安装相关的依赖文件。
3. 去`config.js`文件中, 修改全局的objectName, 例如objectName:["student","post"]。
4. 自定以数据库文件`db.json`，这里的objectName必须和第三步的相同,例如
  - **这里必须要对每一项加上id这个属性**
~~~json
{
  "student": [
    {"id":1, ...},
    {"id":2, ...},
    {"id":3, ...}
  ]
}
~~~
5. 命令:`npm run build` 构建项目，生成相应的路由文件
6. 命令:`npm start`，启动项目，即可更具API进行对db.json文件的相关操作

#### 路由表的设计
示例以student为例， 均为json的数据交互

| 请求方法 |  请求路径  |     返回值     |            参数            |            备注            |
|----------|------------|----------------|----------------------------|----------------------------|
| get      | /student/3 | 单个student    |                            | 获得id为3的学生信息        |
| get      | /student   | studnet  集合  |                            | 获得所有的学生信息         |
| post      | /student   | 新增的student |  name,age,gender,speciality | 新添加一个学生信息         |
| post     | /student/3 | 修改后的student | name,age,gender,speciality | 更新新的状态，保留旧的状态 |
| delete   | /student/3 | 删除的后的student |                            | 删除id为3的学生信息        |
|          |            |                |                            |                            |

#### 自定义接口文档（这里以student为例，API是由用户自己定制，可能会略有不同）
- /student/:id
  + 获取某一个学生的信息 
  + method --> `get`
  + example
  ~~~json
  {
    "id": 1,
    "gender": "0",
    "name": "葫芦娃",
    "age": "8",
    "speciality": "小葫芦"
  }
  ~~~

- /student/
  + 获取所有学生信息
  + method --> `get`
  + example
  ~~~json
  [
    {
      "id": 1,
      "gender": "0",
      "name": "葫芦娃",
      "age": "8",
      "speciality": "小葫芦"
    },
    {
      "id": 2,
      "gender": "0",
      "name": "大娃",
      "age": "8",
      "speciality": "力大无比，金刚不坏之身"
    }
  ]
  ~~~

- /student/
  + 新增一个学生的信息 
  + method --> `post`
  + params(这里根据自己对象需求来定，直接传值即可)
  ~~~url
  name=二娃&age=10
  ~~~
  + example
  ~~~json
  {
    "name": "二娃",
    "age": "10",
    "id": 3,
    "gender": "",
    "speciality": ""
  }
  ~~~
  + 注意
    * 如果原db.json没有student具体项，则会将这个新的student作为标准放入
    * 如果原db.json已经存在student具体项，如果没有涉及到的属性，会自动补充为空值，多出的项目，会附加上去

- /student/:id
  + 修改某个学生的信息 
  + method --> `post`
  + params(这里根据自己对象需求来定，直接传值即可)
  ~~~url
  name=二娃&age=10
  ~~~
  + example
  ~~~json
  {
    "id": 1,
    "gender": "0",
    "name": "二娃",
    "age": "10",
    "speciality": "小葫芦"
  }
  ~~~

- /student/:id
  + 删除一个学生的信息 
  + method --> `delete`
  + example
  ~~~json
  {
    "id": 1,
    "gender": "0",
    "name": "葫芦娃",
    "age": "8",
    "speciality": "小葫芦"
  }
  ~~~

#### 目录结构
~~~shell
|- template       // --> 用于构建的模板路由文件
app.js            // --> 程序运行主入口
build.js          // --> 程序构建入口
config.js         // --> 配置文件
dataSource.js     // --> 封装的数据源操作文件      
db.json           // --> 数据文件         
package-lock.json                   
package.json                 
README.md         
~~~

#### 实现
node.js + express

	
