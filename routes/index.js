
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
// var ObjectId = require('mongoose').ObjectID;

//引入模块
// 加.set('debug',true)可看到终端数据
const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;
//连接数据库
var db = mongoose.createConnection("mongodb://localhost:27017/cinryBlog");

db.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');

    }
});

//设置数据类型
// 用户集合
var userSchema = new mongoose.Schema({
	userid:String,
	username:String,
	password:String,
	superuser:{
		type:Number,
		default:0
	}
})
// 文章集合
var artSchema = new mongoose.Schema({
	id:String,
	title:String,
	author:String,
	body:String,
	comments:[{
		body:String,
		date:Date
	}],
	date:{
		type:Date,
		default:Date.now
	},
	pic:{
		type:String,
		default:"/img/me.jpg"
	},
	like:{
		type:Number,
		default:0
	},
	watch:{
		type:Number,
		default:0
	}
})
// 选择集合
// mongoose在创建model的时候，会自动添加s，所以真正读到的数据库是articles，不是article
var artModel = db.model('articles',artSchema);
var userModel = db.model('users',userSchema);

// 数据集
var content = {id:'004',title:'new',body:'新的内容1'};

// 实例化对象并插入数据（在article表中插入数据）
var artEntity = new artModel(content);

/* 自动访问public文件夹的index 注意：每次渲染完成之后不能关闭数据库，这样每次再访问别的页面连接就断开了 */
router.get('/', function(req, res, next) {
	console.log(req.query.username)
	var uname = req.query.username;
	artModel.find().limit(10).exec(function(err,docs){
		if(err) throw err;
		json = docs;
		if(uname){
			json.push(uname)
			// console.log(json)
			// console.log('传过来的uname'+json[json.length-1])
			res.render('index',{data:json})	
			res.end()
		}else{
			// console.log('不存在')
			res.render('index',{data:json})	
			res.end()
		}	
	})
});
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

// 注册登录页面，如果在地址栏直接输路径，必须用get
router.get('/register',function(req,res,next){
	res.render('register',{title:'Express'})
})
router.get('/login',function(req,res,next){
	var data={
		username:'',
		password:''
	}
	res.render('login',{data:data})
})
// 登录时id和密码验证
router.post('/loginCheck',function(req,res,next){
	console.log('进入了验证')
	var checkStr={
		username:req.body.user,
		password:req.body.pass
	}
	var json={};
	var flag;
	userModel.collection.findOne(checkStr,function(err,docs){
		console.log(docs)
		if(docs==null){
			flag=0;
		}else{
			flag=1;
			json = docs;
			json.flag=flag;
		}
		console.log(json)
		res.end(JSON.stringify(json))
	})
	
})

//接收后台传过来的数据，插入数据库，user表

router.post('/login',function(req,res,next){
	
	var userStr = {
		username:req.body.username,
		password:req.body.pass
	}
	var data={}
	var newUser = new userModel(userStr);
	newUser.save(function(err,docs){
		if(err)  return err;
		console.log(docs)
		data = docs;
		res.render('login',{data:data})
	})	
})
// 专业技术博客界面
router.get('/tech',function(req,res,next){
	console.log('进来了tech.ejs')
	var n = 1;
	var json={};
	artModel.find().limit(6*n).exec(function(err,docs){
		console.log('tech页面渲染完成')	

		if(err) throw err;
		// console.log(docs)
		json = docs;
		// console.log('json数据：',json)
		res.render('tech',{artData:json})
		res.end()
	})
});
router.get('/loadmore',function(req,res,next){
	console.log('加载更多');
	// if(req.query.flag)
})

router.get('/detail',function(req,res,next){
	// 从前台获取对应文章的_id
	var id = req.query.id;
	console.log('后台获取到的id为'+id)  //true
	var json= {};
	var findstr ={
		_id:mongoose.Types.ObjectId(id)
	}
	artModel.collection.findOne(findstr,function(err,docs){
		console.log(docs);
		json = docs;
		res.render('detail',{artData:json})
		console.log('详情页detail渲染完成')
	})

	
})
// 文章编辑发表页面
router.get('/editArt',function(req,res,next){
	res.render('editArt',{title:'Express'})
})
router.post('/addList',function(req,res,next){
	console.log('传来的body'+req.body.con)
	// var str={
	// 	// title:req.body.title,
	// 	body:req.body.con
	// }
	// 实例化文档document对象,让新插入的文档具备所有的数据类型
	var newDoc = new artModel(req.body.con)
	newDoc.save(function(err,docs){
		console.log('后台'+docs._id)
		res.end(JSON.stringify(docs));
	})
})
router.get('/personal',function(req,res,next){
	res.render('personal',{title:'Express'})
})

module.exports = router;
