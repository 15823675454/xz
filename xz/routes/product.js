const express=require('express')
const pool=require('../pool')
var router=express.Router()

router.get('/list',function(req,res)
	{
		var obj=req.query
		if (!obj.pno)
		{
			obj.pno=1
		}
		if (!obj.size)
		{
			obj.size=4
		}
		var start=parseInt((obj.pno-1)*obj.size)
		var count=parseInt(obj.size)
		pool.query('select lid 编号,price 价格,title 标题 from xz_laptop limit ?,?',[start,count],function(err,result)
			{
				if (err)
				{
					throw err
				}
				res.send({code:200,msg:result})
			})
	})

router.post('/add',function(req,res)
	{
		
		var obj=req.body
		//console.log(obj)
		var i=400
		for (var key in obj )
		{
			i++
			if (!obj[key])
			{
				res.send({code:i,msg:key+'  required'})
					return
			}
		}
		pool.query('insert into xz_laptop set ?',obj,function(err,result)
			{
				if (err)
				{
					throw err
				}
				if (result.affectedRows>0)
				{
					res.send({code:200,msg:'添加成功'})
				}
				else 
					{
						res.send({code:401,msg:'添加失败'})
					}
			})
	})
module.exports=router














