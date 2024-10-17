const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const objectId=Schema.ObjectId;

const user= new Schema({
    email:String,
    password:String,
    name:String,

})

const todo=new Schema({
    title:String,
    done:Boolean,
    UserId:objectId

})
const usermodel=mongoose.model('users',user)
const todomodel=mongoose.model('todos',todo)

module.exports={
    usermodel:usermodel,
    todomodel:todomodel
}