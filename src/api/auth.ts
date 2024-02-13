import { Request } from "@/utils/request";

type PwdLoginParamsT = {
    username: string;
    password: string;
}

// 普通登录
export function login(params: PwdLoginParamsT) {
    return Request.post('/user/v1/auth/login', params)
}

type EmailLoginParamsT = {
    email: string;
    vcode: string;
}

// TODO: 邮箱登录
export function emailLogin(params: EmailLoginParamsT) {
    return Request.post('/user/v1/auth/login/email', params)
}

type RegisterParamsT = {
    username: string;
    // email: string;
    password: string;
    realname: string;
}

// 注册
export function register(params: RegisterParamsT) {
    return Request.post('/user/v1/auth/registry', params)
}