import { Request } from "@/utils/request";

const prefix = '/plan/v1'

export type UidT = {
    uid: string;
}

export type PlanIdFkT = {
    planid: string;
}

// 获取计划详情
export function getPlanDetail(params: UidT) {
    return Request.get(`${prefix}/plan/`, params)
}

export type CreatePlanParamsT = {
    type: number; // 0=康复、1=养生
    target: string; // 目标（口头描述）
    cycle: string; // 周期（口头描述）
}

// 创建计划
export function createPlan(params: CreatePlanParamsT) {
    return Request.post(`${prefix}/plan/`, params)
}

// 完成计划
export function completePlan(params: UidT) {
    return Request.put(`${prefix}/plan/complete`, params)
}

// 获取计划列表
export function getPlanList() {
    return Request.get(`${prefix}/plan/list`, {})
}

// 获取计划复盘
export function getPlanReview(params: UidT) {
    return Request.get(`${prefix}/plan/review`, params)
}


// ---- 打卡记录 ----


// 获取打卡记录列表
export function getRecordList(params: PlanIdFkT) {
    return Request.get(`${prefix}/record/list`, params)
}

// 获取打卡记录详情
export function getRecordDetail(params: UidT) {
    return Request.get(`${prefix}/record/`, params)
} 

export type CreateRecordParamsT = {
    diet: string; // 饮食
    sleep: string; // 作息
    medical: string; // 用药
} & PlanIdFkT

// 打卡
export function createRecord(params: CreateRecordParamsT) {
    return Request.post(`${prefix}/record/`, params)
}

