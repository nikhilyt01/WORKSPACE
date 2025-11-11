import axiosInsrtance from "./axios"

 const signup= async(signupData)=>{
    const response = await axiosInsrtance.post("/auth/signup",signupData);
    return response.data;
}
export default signup;