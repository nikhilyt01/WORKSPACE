import axios from "axios"


export default async function Blogpage({params}:any){
    const BlogId=(await params).blogId;


    return (<div>
           Blog page number{JSON.stringify(BlogId)}

           {/* Catch all segments blogId */}
           
           {/* => stringfy to  store array  if folder name [...blogid] it will store every thing after blogid in array  */}
              {/* if user is at /blog then also it will catch */}
              

           </div>)

}