import axios from "axios"


export default async function Blogpage({params}:any){
    const BlogId=(await params).blogId;


    return (<div>
        header
           Blog page number{JSON.stringify(BlogId)}
        footer
           {/* Catch all segments blogId */}
           
           {/* => stringfy to  store array  if folder name [...blogid] it will store every thing after blogid in array  */}
              {/* if user is at /blog then also it will catch */}


    {/* when we rename parent folder to [ [...blogId]] it can handle /blog also i.e if random routes Json.stringfy stores array else at /blog only header n footer */}
              

           </div>)

}