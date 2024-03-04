import { Request } from '@/utils/request'
import { PageParamsT, PageResultT } from './types'

const prefix = '/plan/v1'

export type UidT = {
    uid: string
}

export type PlanIdFkT = {
    planid: string
}

export type RecordIdFkT = {
    recordid: string
}

// 获取计划详情
export function getPlanDetail(params: UidT) {
    return Request.get(`${prefix}/plan/`, params)
}

export type CreatePlanParamsT = {
    type: number // 0=康复、1=养生
    target: string // 目标（口头描述）
    cycle: string // 周期（口头描述）
}

// 创建计划
export function createPlan(params: CreatePlanParamsT) {
    return Request.post<any>(`${prefix}/plan/`, params)
}

// 生成计划大纲
export function genOverwrite(params: PlanIdFkT, callback: (string) => void) {
    return Request.streamFetch(
        `${prefix}/plan/overview`,
        params,
        'post',
        callback
    )
}

// 完成计划
export function completePlan(params: UidT) {
    return Request.put(`${prefix}/plan/complete`, params)
}

export type PlanListQuery = {
    status: number // -1=全部；0=进行中；1=已结束；2=中断
}

// 获取计划列表
export function getPlanList(params: PlanListQuery & PageParamsT) {
    return Request.get<PageResultT>(`${prefix}/plan/list`, params)
}

// 获取计划复盘
export function getPlanReview(params: PlanIdFkT) {
    return Request.get(`${prefix}/plan/review`, params)
}

// ---- 打卡记录 ----

// 获取打卡记录列表
export function getRecordList(params: PlanIdFkT) {
    return Request.get<any>(`${prefix}/record/list`, params)
}

// 获取打卡记录详情
export function getRecordDetail(params: UidT) {
    return Request.get(`${prefix}/record/`, params)
}

export type CreateRecordParamsT = {
    diet: string // 饮食
    sleep: string // 作息
    medical: string // 用药
} & PlanIdFkT

// 打卡
export function createRecord(params: CreateRecordParamsT) {
    return Request.post<any>(`${prefix}/record/`, params)
}

// 对打卡记录进行分析
export function genRecordAna(params: RecordIdFkT, callback: (string) => void) {
    return Request.streamFetch(
        `${prefix}/record/genAdvice`,
        params,
        'post',
        callback
    )
}

// --- todo ---

// 获取 todo 列表（今日）
export function getTodoList() {
    return Request.get<any>(`${prefix}/plan/todolist`, {})
}

// 获取 check 列表（今日）
export function getCheckList() {
    return Request.get<any>(`${prefix}/plan/checklist`, {})
}
