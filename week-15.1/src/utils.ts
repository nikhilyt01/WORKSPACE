export function random(len:number){
    let options ="qwertiyozxdvcjsdbkv1237647598";
    let lenght = options.length;
    let ans="";
    for(let i=0;i<len;i++){
        ans += options[Math.floor((Math.random()*lenght))]
    }
    return ans;
}