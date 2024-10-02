//filetring
//given input arr give back alll even values
const arr=[1,2,3,4,5];

const ans=arr.filter((n) => {
    if(n%2==0){
        return true;
    }
    else{
        return false;
    }
})
console.log(ans);

//if we want elemts starting with h

const arr1=["harsh","harkirat","raman"];

const ans2=arr1.filter(function(n){ /// n--> is whole string
    if(n.startsWith("h")){
        return true;
    }
    else{
        return false;
    }
})
console.log(ans2);

