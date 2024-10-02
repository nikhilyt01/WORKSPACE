const axios=require("axios")
/*async function main(){
    const response= await fetch("https://httpdump.app/dumps/4371df29-482b-4cc6-84ef-adef8315d23a",{method:"POST"});
    const data=await response.json();
    console.log(response.data.length);
}
main(); */


async function main(){
    const response= await axios.post("https://httpdump.app/dumps/4371df29-482b-4cc6-84ef-adef8315d23a");
   
    console.log(response.data.length);
}
main();