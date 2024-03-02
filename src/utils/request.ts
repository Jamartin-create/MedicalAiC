import axios from "@/plugins/axios";
import { useAuthStore } from "@/store/auth";
import { AxiosRequestConfig } from "axios";

const eventStreamDataTrans = (es: string) => { 
  const eventIdx = es.indexOf('event: ')
  const dataIdx = es.indexOf('data: ')
  return {
      event: es.slice(eventIdx + 7, dataIdx),
      data: es.slice(es.indexOf('{'), es.lastIndexOf('}') + 1)
  }
}


export type ResponseT<T> = {
    code: number;
    msg: string;
    data: T;
}

export class Request {
  static get = <T>(url: string, params: any): Promise<ResponseT<T>> => {
    return new Promise((reso, reje) => {
      axios
        .get(url, { params: params })
        .then((res) => {
          reso(res.data);
        })
        .catch((err) => {
          reje(err);
        });
    });
  };
  static post = <T>(url: string, params: any, headers?: AxiosRequestConfig): Promise<ResponseT<T>> => {
    return new Promise((reso, reje) => {
      axios
        .post(url, params, headers)
        .then((res) => {
          reso(res.data);
        })
        .catch((err) => {
          reje(err);
        });
    });
  };
  static delete = <T>(url: string, params: any): Promise<ResponseT<T>> => {
    return new Promise((reso, reje) => {
      axios
        .delete(url, { params: params })
        .then((res) => {
          reso(res.data);
        })
        .catch((err) => {
          reje(err);
        });
    });
  };
  static put = <T>(url: string, params: any): Promise<ResponseT<T>> => {
    return new Promise((reso, reje) => {
      axios
        .put(url, params)
        .then((res) => {
          reso(res.data);
        })
        .catch((err) => {
          reje(err);
        });
    });
  };

  // 流式调用
  static streamFetch = (url: string, params: any, method: string, callback: (string) => void) => {
    return new Promise((resolve, reject) => {
      fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
        method,
        body: JSON.stringify(params),
        headers: {
          Authorization: 'Bearer ' + useAuthStore().token,
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        const encode = new TextDecoder('utf-8')
        const reader = response.body?.getReader()
  
        while (true) {
          const red = await reader?.read();
          if (red?.done) {
            resolve(true)
            break
          }
          const text = encode.decode(red?.value)
  
          if (text === "<ERR>") {
            callback("Error")
            reject('error')
            break
          } else {
            const { data } = eventStreamDataTrans(text)
            callback(JSON.parse(data).result)
          }
        }
      })
    })
  }
}
