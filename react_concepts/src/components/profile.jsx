import { useContext } from "react";
import UserContext from "../context/Usercontext";

function Profile(){
    const {user}=useContext(UserContext);

    if(!user) return(
        <div className="text-center">
            <p>Please Login !</p>
        </div>
    )
    return (
        <div className="text-center"> 
           <p> Welcome {user.username}</p>
        </div>
    )
}

export default Profile;