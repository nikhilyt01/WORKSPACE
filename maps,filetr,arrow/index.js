//given arr give arr that doubels each element
 const input=[1,2,3,4,5]
/*const newarr=[];
for (let i=0;i<input.length;i++){
    newarr.push(input[i]*2)
}
console.log(newarr);  */

//another way

 const ans=input.map(function(i){
    return i*2;

 });
 console.log(ans)

 //create a fun map that takes 2 inputs 
 //array ,and a transformation callback/fn
 //and transforms the array into new oone using transformn fn
 const map=(arr,fn) =>{
    const transformedarr=[];
    for (let i=0;i<arr.length;i++){
        transformedarr.push(fn(arr[i]))
    }
    return transformedarr;
 };