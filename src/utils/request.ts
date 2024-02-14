import axios from "@/plugins/axios";
import { AxiosRequestConfig } from "axios";

export type ResponseT = {
    code: number;
    msg: string;
    data: any;
}

export class Request {
  static get = (url: string, params: any): Promise<ResponseT> => {
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
  static post = (url: string, params: any, headers?: AxiosRequestConfig): Promise<ResponseT> => {
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
  static delete = (url: string, params: any): Promise<ResponseT> => {
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
  static put = (url: string, params: any): Promise<ResponseT> => {
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
}
