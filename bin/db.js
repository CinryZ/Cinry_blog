/*
* @Author: admin
* @Date:   2018-07-17 15:10:01
* @Last Modified by:   admin
* @Last Modified time: 2018-07-18 14:14:33
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function _connect(callback){
	MongoClient.connect(url,function(err,db){
		if(err) throw err;
		callback(err,db);
		db.close();
	});
}

//封装插入数据
exports.insert=function(dbase,collectionName,myobj,callback){
	_connect(function(a,db){
		//数据为对象
		//if(Array.isArray(myobj)==false)
		if(myobj.length=='undefined'){
			// 将对象直接转换成数组
			 myobj = [myobj];
			}
			db.db(dbase).collection(collectionName).insertMany(myobj,function(err,result){
				if (err)  throw err;
				console.log("文档插入成功");
				// 这里的回调函数作用是在插入成功之后用户自行定义的后续步骤
				callback(err,result)
				db.close();	
			})
						
	})
}

// 封装查询数据(加限定：多个条件，分页时等等) sort page limit
exports.query=function(dbase,collectionName,param1,param2,param3,callback){
	var len = arguments.length;
	_connect(function(a,db){
		if(len==4){
			// 返回集合中所有数据或根据条件查询的数据
				db.db(dbase).collection(collectionName).find(param1).toArray(function(err,result){
					if (err) throw err;
			        console.log(result);
			        callback=param2;
			        callback(err,result)
			        db.close();
			})
		}else if(len==5){
			if(isNaN(param2)==false){
				db.db(dbase).collection(collectionName).find(param1).limit(param2).toArray(function(err,result){
						if (err) throw err;
				        console.log(result);
				        callback=param3;
				        callback(err,result)
				        db.close();				 
				})
			}else{
					db.db(dbase).collection(collectionName).find(param1).sort(param2).toArray(function(err,result){
						if (err) throw err;
				        console.log(result);
				        callback=param3;
				        callback(err,result)
				        db.close();
				})
			}		
		}else if(len==6){
			db.db(dbase).collection(collectionName).find(param1).skip(param2).limit(param3).toArray(function(err,result){
					 if (err) throw err;
				        console.log(result);
				        callback(err,result)
				        db.close();
				})
		}
		
		})		
}

// 封装修改数据
exports.alter=function(dbase,collectionName,whereStr,updateStr,callback){
	_connect(function(a,db){
		var ustr = {$set:updateStr}
		console.log(ustr)
		db.db(dbase).collection(collectionName).updateMany(whereStr,ustr,function(err,result){
			if (err) throw err;
	        console.log("文档更新成功");
	        callback(err,result);
	        db.close();
		})
	})
}

//封装删除数据
exports.del=function(dbase,collectionName,whereStr,callback){
	_connect(function(a,db){
		db.db(dbase).collection(collectionName).deleteMany(whereStr,function(err,obj){
			if(err) throw err;
			console.log(typeof(obj))
			console.log(obj.result.n+"条文档已被删除");
			callback(err,obj);
			db.close();
		})
	})
}