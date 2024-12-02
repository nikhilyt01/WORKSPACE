
interface user { name:string;
    age:number;
    address?:{ country:string;
              place:string;
              pincode:number;
    };
}
 // interface can also have interace
let user1:user ={
    name:"nikhil",
    age:18,
    address :{
        country:"sjbad",
        place:"sdf",
        pincode:82378
    }

}
function Islegal(user:user):boolean {
    if(user.age>=18){
        return true;
    }else{
        return false;
    }

}
 
let ans=Islegal(user1);
console.log(ans);