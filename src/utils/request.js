

/**
 * 封装的网络请求
 */
import {fetch} from 'dva';
import { notification } from 'antd';
import router from 'umi/router'

/**请求状态码 */
const codeMessage = {
    200:'服务器成功返回请求的数据',
    201:'新建或修改数据成功',
    202:'一个请求已经进入后台排队（异步任务）',
    204:'删除数据成功',
    400:'发出的请求有错误，服务器没有进行新建或修改数据的操作',
    401:'用户没有权限',
    403:'用户达到授权，但是访问是被禁止的',
    404:'发出的请求针对的是不存在的记录，服务器没有进行操作',
    406:'请求的格式不可得',
    410:'请求的资源被永久删除，且不会再得到',
    500:'服务器发生错误',
    502:'网关错误',
    503:'服务不可用，服务器暂时过载或维护',
    504:'网关超时'
}
export default async function request(url,options){
    return await fetch(url,{
        ...options,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Accept': 'application/json',

            // 'Content-Type': 'application/json',
        }
    })
    .then(checkStatus)
    .catch(checkErrorStatus)
}

// then
function checkStatus(response){
    if(response.status >= 200 && response.status < 300){
        return response.json()
    }
    const errText = codeMessage[response.status] || response.statusText;
    // 错误信息提醒
    notification.error({
        message:`请求错误${response.status}${response.url}`,
        description:errText
    })
}

// catch
function checkErrorStatus(err){
    if(err && err.response){
        const {status} = err.response;
        if(status == '403'){
            router.push('/exception/403')
        }
        if(status <= '504' && status >= '500'){
            router.push('/exception/500')
        }
        if(status >= '404' && status <= '422'){
            router.push('/exception/400')
        }
    }
}