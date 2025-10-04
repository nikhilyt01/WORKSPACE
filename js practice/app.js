const s =prompt("enter a string");
let ispallindrome=true;

let i=0,j= s.length -1;
while(i<j){
    if(s.charAt(i) != s.charAt(j)){  // agar 1st element not equal hai uske ulta or last on reverse
       ispallindrome=false ; //
       break;
    }
    i++;
    j--;
}
if(ispallindrome) console.log("palindrome");
else console.log("not palindrome")