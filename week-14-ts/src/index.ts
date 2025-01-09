interface user {
   name: string ;
   age: number;
};
function sumofage(user1:user,user2:user){
   return user1.age + user2.age;
}

const ans= sumofage({name:"nikhil",age:23},{name:"singh",age:34});
console.log(ans);