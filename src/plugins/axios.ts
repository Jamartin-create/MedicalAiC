import { notify } from '@/components/Notification'
import { useAuthStore } from '@/store/auth'
import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'

function errorHandler(status: number, options: any) {
    let message = ''
    // 状态码判断
    switch (status) {
        //TODO
        case 401:
            message = 'Token 过期'
            break
        case 404:
            message = '数据获取源失效'
            break
        case 403:
            message = '无权限访问'
            break
        case 500:
            message = '服务器异常'
            break
        case 200:
            options.code && (message = options.msg)
            break
        default:
            break
    }
    message && notify(message)
}

//取消重复请求
const pending: any[] = []
const CancelToken = axios.CancelToken

//移除重复请求
function removePending(config: AxiosRequestConfig) {
    for (const key in pending) {
        const item = +key
        const list = pending[key]
        //当前请求在数组中存在时执行取消操作
        if (
            list.url === config.url &&
            list.method === config.method &&
            JSON.stringify(list.params) === JSON.stringify(config.params) &&
            JSON.stringify(list.data) === JSON.stringify(config.data)
        ) {
            pending.splice(item, 1)
        }
    }
}

/**
 * @description 实例化请求配置
 */
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin-Type': '*'
    },
    timeout: 1000 * 30,
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false
})

instance.interceptors.request.use(reqInter, reqInterErr)
instance.interceptors.response.use(resInter, resInterErr)

/**
 * @description 请求拦截器
 * @param config Axios请求配置
 * @returns config
 */
function reqInter(config: InternalAxiosRequestConfig) {
    removePending(config)
    config.cancelToken = new CancelToken(c => {
        pending.push({
            url: config.url,
            method: config.method,
            params: config.params,
            data: config.data,
            cancel: c
        })
    })

    const authStore = useAuthStore()
    if (authStore.isLogin)
        config.headers.Authorization = 'Bearer ' + authStore.token
    return config
}

/**
 * @description 请求拦截异常
 */
function reqInterErr(error: any) {
    //TODO: 异常处理
    console.error(error.data.error.message)
    return Promise.reject(error.data.error.message)
}

/**
 * @description 响应拦截器
 */
function resInter(config: AxiosResponse) {
    //移除重复请求队列
    removePending(config.config)
    errorHandler(config.status, config.data)
    if (config.status === 200 || config.status === 204) {
        return Promise.resolve(config)
    } else {
        return Promise.reject(config)
    }
}

/**
 * @description 响应拦截器异常
 */
function resInterErr(error: AxiosError) {
    console.log(error)
    const { response } = error // 这个 response 和 axios context 是相同的
    if (response) {
        errorHandler(response.status, response.data)
        return Promise.reject(response)
    } else {
        //网络异常
        console.error('网络异常')
    }
}

export default instance
