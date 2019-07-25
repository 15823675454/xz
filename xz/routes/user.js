const express=require('express')
//引入连接池模块
const pool=require('../pool.js')
var router=express.Router()
//添加路由
//1.用户注册
router.post('/reg',function(req,res)

	{
		var obj=req.body
		//console.log(obj)
		//验证数据是否为空
		if (!obj.uname)
		{
			res.send({code:401,msg:'uname required'})
			return
		}
		else if (!obj.upwd)
		{
			res.send({code:402,msg:'upwd required'})
				return
		}
		else if (!obj.email)
		{
			res.send({code:403,msg:'email required'})
				return
		}
		else if (!obj.phone)
		{
			res.send({code:404,msg:'phone required'})
				return
		}
		//执行SQL语句
		pool.query('insert into xz_user set ?',[obj],function(err,result)
			{
				if (err)
				{
					throw err
				}
				if (result.affectedRows>0)
				{
					res.send({code:200,msg:'register suc'})
				}
			})
		
	})


//2.用户登录
router.post('/login',function(req,res)

	{
		var obj=req.body
		if (!obj.uname)
		{
			res.send({code:401,msg:'uname required'})
				return
		}
		else if (!obj.upwd)
		{
			res.send({code:402,msg:'upwd required'})
				return
		}
		//执行sql语句
		//查找用户和密码同时满足的数据
		pool.query('select *from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],function(err,result)
			{
				if (err)
				{
					throw err
				}
				//console.log(result)
				if (result.length>0)
				{
					res.send({code:200,msg:'register suc'})
				}
				else res.send({code:301,msg:'login err'})
			})
		//console.log(obj)
		
	})

//3.用户检索
router.get('/detail',function(req,res)

	{
		var obj=req.query
			if (!obj.uid)
			{
				res.send({code:401,msg:'uid require'})
					return
			}
		pool.query('select uid 编号,uname 姓名,upwd 密码,email 邮箱 from xz_user where uid=?',[obj.uid],function(err,result)
			{
			if (err)
			{
				throw err
			}
			if (result.length>0)
			{
				res.send(result[0])
			}
			else res.send({code:301,msg:'未检索到用户'})
			})
	})

//4.修改数据
router.get('/update',function(req,res)
	{
		var obj=req.query
			var i=400
			for (var key in obj)
			{
				i++
				if (!obj[key])
				{
					res.send({code:i,msg:key+'不能为空'})
						return
				}

				//else res.send({code:200,msg:'修改成功'})
			}
			
	pool.query('update xz_user set ? where uid=?',[obj,obj.uid],function(err,result)
			{
				if (err)
				{
					throw err
				}
				if (result.affectedRows>0)
				{
					res.send({code:200,msg:'修改成功'})
				}
				else 
				{
					res.send({code:301,msg:'修改失败！您输入的编号有误'})
				}
				
			})
		
	
	})

//5.用户列表
router.get('/list',function(req,res)
	{
		var obj=req.query
		if (!obj.pno)
		{
			obj.pno=1
		}
		if (!obj.size)
		{
			obj.size=3
		}
		var start=parseInt((obj.pno-1)*obj.size)
		var count=parseInt(obj.size)
		pool.query('select *from xz_user limit ?,?',[start,count],function(err,result)
		{
			//console.log(result)
			if (err)
			{
				throw err
			}
			res.send({code:200,msg:result})
		})
	})

//6.删除列表			
router.get('/delete',function(req,res)
	{
		var n=req.query.uid
			//console.log(n,typeof n)
		if (!req.query)
		{
			res.send({code:301,msg:'uid required'})
				return
		}
		pool.query('delete from xz_user where uid=?' ,[n],function(err,result)
			{
				//console.log(result)
				
				if (err)
				{
					throw err
				}
				if ( result.affectedRows>0)
				{
					res.send({code:200,msg:'删除'+n+'号列表成功'})
				}
				else res.send({code:401,msg:'第'+n+'列数据不存在'})
			})
	
	})
			
module.exports=router











