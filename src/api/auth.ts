import { Request } from "@/utils/request";

export type PwdLoginParamsT = {
    username: string; // 用户名
    password: string; // 密码
    staystatus?: boolean; // 保存登录状态
}

// 普通登录
export function login(params: PwdLoginParamsT) {
    return Request.post('/user/v1/auth/login', params)
}

export type EmailLoginParamsT = {
    email: string; // 邮箱
    vcode: string; // 验证码
}

// TODO: 邮箱登录
export function emailLogin(params: EmailLoginParamsT) {
    return Request.post('/user/v1/auth/login/email', params)
}

export type RegisterParamsT = {
    username: string; // 用户名
    // email: string;
    password: string; // 密码
    repassword: string; // 确认密码
    realname: string; //。 真实姓名
}

// 注册
export function register(params: RegisterParamsT) {
    return Request.post('/user/v1/auth/registry', params)
}