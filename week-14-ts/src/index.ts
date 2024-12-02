
interface User { name:string;
    age:number;
    islegal():boolean;
}

class Manager implements User {
    name:string;
    age:number;
    constructor (name:string,age:number){
        this.name=name;
        this.age=age;
    }
    islegal(){
        return this.age >18
    }

}
const m=new Manager("harkiart",21);
console.log(m.name)