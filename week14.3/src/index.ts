interface user{
    name:string,
    age:number
}
function sumofage(user1:user,user2:user){
    return user1.age+ user2.age;
}
const sage=sumofage({name:"nijkhi",age:128},{name:"shdah",age:7288});
console.log(sage)