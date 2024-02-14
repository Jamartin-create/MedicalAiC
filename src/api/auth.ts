import { Request } from "@/utils/request";

export type PwdLoginParamsT = {
    username: string;
    password: string;
    staystatus?: boolean;
}

// 普通登录
export function login(params: PwdLoginParamsT) {
    return Request.post('/user/v1/auth/login', params)
}

export type EmailLoginParamsT = {
    email: string;
    vcode: string;
}

// TODO: 邮箱登录
export function emailLogin(params: EmailLoginParamsT) {
    return Request.post('/user/v1/auth/login/email', params)
}

export type RegisterParamsT = {
    username: string;
    // email: string;
    password: string;
    repassword: string;
    realname: string;
}

// 注册
export function register(params: RegisterParamsT) {
    return Request.post('/user/v1/auth/registry', params)
}