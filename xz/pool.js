const mysql=require('mysql')
var pool=mysql.createPool(
	{
		post:'127.0.0.1',
		port:3306,
		user:'root',
		password:'',
		database:'xz',
		connctionLimit:20
	})
//导出连接池对象
module.exports=pool










