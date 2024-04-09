import axios from '@/plugins/axios'
import { useAuthStore } from '@/store/auth'
import { AxiosRequestConfig } from 'axios'

// 事件解析器（将 GPT 返回的流式数据格式化 —— 知识点：EventSource）
const eventStreamDataTrans = (es: string) => {
    const eventIdx = es.indexOf('event: ')
    const dataIdx = es.indexOf('data: ')
    return {
        event: es.slice(eventIdx + 7, dataIdx),
        data: es.slice(es.indexOf('{'), es.lastIndexOf('}') + 1)
    }
}

// 响应数据类型
export type ResponseT<T> = {
    code: number
    msg: string
    data: T
}

export class Request {
    // 发送 GET 请求
    static get = <T>(url: string, params: any): Promise<ResponseT<T>> => {
        return new Promise((reso, reje) => {
            axios
                .get(url, { params: params })
                .then(res => {
                    reso(res.data)
                })
                .catch(err => {
                    reje(err)
                })
        })
    }

    // 发送 POST 请求
    static post = <T>(
        url: string,
        params: any,
        headers?: AxiosRequestConfig
    ): Promise<ResponseT<T>> => {
        return new Promise((reso, reje) => {
            axios
                .post(url, params, headers)
                .then(res => {
                    reso(res.data)
                })
                .catch(err => {
                    reje(err)
                })
        })
    }

    // 发送 DELETE 请求
    static delete = <T>(url: string, params: any): Promise<ResponseT<T>> => {
        return new Promise((reso, reje) => {
            axios
                .delete(url, { params: params })
                .then(res => {
                    reso(res.data)
                })
                .catch(err => {
                    reje(err)
                })
        })
    }

    // 发送 PUT 请求
    static put = <T>(url: string, params: any): Promise<ResponseT<T>> => {
        return new Promise((reso, reje) => {
            axios
                .put(url, params)
                .then(res => {
                    reso(res.data)
                })
                .catch(err => {
                    reje(err)
                })
        })
    }

    // 流式调用（请求 GPT 数据）
    static streamFetch = (
        url: string,
        params: any, // 参数
        method: string, // 请求方式
        callback: (string) => void // 回调（每当后端返回了数据，这里就回调一下定义好的方法）
    ) => {
        return new Promise((resolve, reject) => {
            // 请求的发起 - fetch
            fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
                method,
                body: JSON.stringify(params),
                headers: {
                    Authorization: 'Bearer ' + useAuthStore().token,
                    'Content-Type': 'application/json'
                }
            }).then(async response => {
                // 转义 => 二进制数据转换成文本 ----

                const encode = new TextDecoder('utf-8') // 创建一个解码器
                const reader = response.body?.getReader() // 类似一个读卡器

                while (true) {
                    const red = await reader?.read()
                    // 如果结束-退出循环
                    if (red?.done) {
                        resolve(true)
                        break
                    }
                    const text = encode.decode(red?.value) // 二进制解码

                    if (text === '<ERR>') {
                        callback('Error') // 失败
                        reject('error')
                        break
                    } else {
                        const { data } = eventStreamDataTrans(text)
                        callback(JSON.parse(data).result) // 执行回调
                    }
                }
            })
        })
    }
}
