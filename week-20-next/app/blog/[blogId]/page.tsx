import axios from "axios"


export default async function Blogpage({params}:any){
    const BlogId=(await params).blogId;
    const res=await axios.get(`https://jsonplaceholder.typicode.com/posts/${BlogId}`)
    const data=res.data;

    return (<div>
           Blog page number{BlogId}

               <br/>

               title-{data.title}
              <div>
                body - {data.body}
              </div>

           </div>)

}