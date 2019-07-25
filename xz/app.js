const express=require('express')
const bodyParser=require('body-parser')
const mysql=require('mysql')
const userRouter=require('./routes/user.js')
const productRouter=require('./routes/product.js')
var app=express()
app.listen(8080)
/*
var pool=mysql.createPool(
	{
		host:'127.0.0.1',
		port:3306,
		user:'root',
		password:'',
		database:'xz',
		connectionLimit:20
	})
	*/
app.use(express.static('./public'))

app.use(bodyParser.urlencoded(
		{
			extended:false
		}))
app.use('/user',userRouter)
app.use('/product',productRouter)
				/*
app.post('/reg',function(req,res)
	{
		

	
		var a=req.body
		pool.query(`insert into xz_user set ?`,[a],function(err,result)
			{
				if (err)
				{
					throw err
				}
				if (result.affectedRows>0)
				{
					res.send('注册成功')
				}
			})
		
		
	})
*/










