 interface user{
    firstname:string;
    lastname:string;
    age:number;
 }
 function filteruser(users:user[]){
    return users.filter((user)=> user.age>18)
 }
 const filterdusers=filteruser([{firsstname:"nikhil",lastname:"singh",age:19},
    {firstname:"dfhdh",lastname:"fdbdaf",age:16}
 ])
 console.log(filterdusers)