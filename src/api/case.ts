import { Request } from "@/utils/request";

const prefix = '/case/v1'

export type CaseIdT = {
    uid: string;
}

export type CreateCaseParamsT = {
    curSituation: number; // 当前状况：0=差、1=一般、2=好
    summary: string; // 初始病情描述
    medical: string; // 用药史
    mdHistory: string; // 病史
}

// 创建病例
export function createCase(params: CreateCaseParamsT) {
    return Request.post(`${prefix}/mdCase/create`, params)
}

export type FeedBackCaseParamsT = {
    status: number; // 状态：0=生病中，1=已痊愈
    summary: string; // 描述
} & CaseIdT

// 病情回馈
export function caseFeedBack(params: FeedBackCaseParamsT) {
    return Request.put(`${prefix}/mdCase/feedBack`, params)
}

// 获取病例详情
export function getCaseDetail(params: CaseIdT) {
    return Request.get(`${prefix}/mdCase/detail`, params)
}

// 获取病例列表
export function getCaseList() {
    return Request.get(`${prefix}/mdCase/list`, {})
}