import axios from "axios";
import { getToken } from "../utils/getToken";
const axiosInstance = axios.create({
  baseURL: "http://15.206.16.230:4100/api/v1/admin",
});
axiosInstance.interceptors.request.use((config)=>{
    const token = getToken("ilineLogin", "token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},
(error)=>{
    return Promise.reject(error)
}
)

axiosInstance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})

export default axiosInstance;