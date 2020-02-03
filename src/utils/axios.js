import axios from 'axios';
import qs from 'qs';


function Axios(url,data={},method = 'get'){
    var that = this;
    return new Promise((resolve,reject)=>{
        let promise;
        if(method == 'get'){
            promise = axios.get(url,{
                params:data
            })
        }else if(method == 'post'){
            promise = axios.post(url,qs.stringify(data,{ indices: false }))
        }
        promise.then(res=>{
            resolve(res.data)
        }).catch(error=>{
            console.log(error.message)
        })
    })
}
export default Axios;