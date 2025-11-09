import axios from "axios";

const axiosInsrtance= axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true, // allowed cookies 
}); 
export default axiosInsrtance;
