// util.js封装公共配置
import axios from "axios";
const instance=axios.create({
    // axios实现通用请求
    baseUrl:'http://localhost:8888',
    timeout:1000,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
});
export default instance;