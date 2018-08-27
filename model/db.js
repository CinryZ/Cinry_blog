/*
* @Author: Cinry
* @Date:   2018-08-04 23:05:52
* @Last Modified by:   Cinry
* @Last Modified time: 2018-08-09 18:48:14
*/
//mongoose封装增删改查   https://blog.csdn.net/lkw411526/article/details/53495077

//引入模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//连接数据库
var db = mongoose.createConnection("mongodb://localhost:27017/cinryBlog");

// var userSchema = new Schema({
// 	userid:"string",
// 	username:"string",
// 	password:"string",
// 	superuser:"number"
// })

//设置数据类型
var artSchema = new Schema({
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
	like:Number
})

function _connection(callback){
	mongoose.connect(url,function(err,db){
		if(err){
			throw err;
			console.log('连接失败！');
		}else{
			console.log('连接成功！');
			callback(err,db);
		}
		db.close();
	})
}

// 插入数据 add()方法
// model:插入数据的模型，即表。condition：条件
exports.addData=function(model,condition,callback){
	model.create(condition,function(err,result)){
		if(err){
			console.log('插入数据失败！');
			return err;
		} else{
			console.log('插入成功！');
			callback({success:1,flag:'success'})
		};
	}
}

// 更新数据 update()
// condition：根据什么条件来对其更新
// update:更新的条件{set:id=xxx}
exports.updateData=function(model,condition,update,options,callback){
	model.update(condition,update,options,function(err,result){
		if(err){
			console.log('更新数据失败！');
			return err;
		} else{
			if(result.n!=0){
				console.log('有条'+result.n+'数据更新成功')
				callback({success:1,flag:'success'})
			}else{
				console.log('没有这条数据！')
				callback({success:0,flag:'not success'})
			}
		}
	})
}

// 删除数据 remove()
exports.removeData=function(model,condition,callback){
	model.remove(condition,function(err,result){
		if(err){
			console.log('删除数据失败！');
			return err;
		} else{
			if(result.result.n!=0){
				console.log('删除了'+result.result.n+'条数据');
				callback({success:1,flag:'success'})
			}else{
				console.log('没有找到要删除的数据！');
				callback({success:0,flag:'not success'})
			}
		}
	})
}

// 查找find()方法 非关联查找
exports.findData=function(model,conditions,fields,options,callback){
	var sort = options.sort == undefined ? {_id:-1} : options.sort;
    delete options.sort;
    model.find(condition, fields, options, function (error, result) {
        if (error) {
            console.log(error);
            callback({success: 0, flag: "find data fail"});
        } else {
            if (result.length != 0) {
                console.log('find success!');
                callback({success: 1, flag: "find data success", result: result});
            } else {
                console.log('find fail:no this data!');
                callback({success: 0, flag: 'find fail:no this data!'});
            }
        }
    }).sort(sort);
}

/**
 * 公共populate find方法
 * 是关联查找
 * @param model
 * @param conditions
 * @param path :需要覆盖的字段
 * @param fields :select fields (name -_id,Separated by a space field,In front of the field name plus "-"said not filled in)
 * @param refmodel （关联的字段，有path可为null）
 */
exports.findDataPopulation = function (model, conditions, path, fields, refmodel, options, callback) {

    model.find(conditions).populate(path, fields, refmodel, options).exec(function (err, result) {
        if (err) {
            console.log(err);
            callback({success: 0, flag: 'population find data fail'});
        } else {
            if (result.length != 0) {
                console.log('population find success!');
                callback({success: 1, flag: 'population find data success', result: result});
            } else {
                console.log('population find fail:no this data!');
                callback({success: 0, flag: 'population find fail:no this data!'});
            }
        }
    });
}