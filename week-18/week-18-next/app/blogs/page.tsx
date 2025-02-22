
import axios from "axios";

async function getBlogs(){
    const res= await axios.get("https://jsonplaceholder.typicode.com/todos/")
    return res.data;
}

export default async function Blogs(){
    const blogs = await getBlogs();
    
    return <div>
        {blogs.map((blog:todo)=><Todo title={blog.title} completed={blog.completed}></Todo>)}
    </div>
}

interface todo {
    completed:boolean;
    title:string;
}

function Todo({title,completed}:todo){
    return <div>
        {title } <div>{completed? "done" : "not done yet"} </div>
    </div>
}