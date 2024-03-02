import { Request } from "@/utils/request";

export type ChatIdT = {
    uid: string;
}

// 新建对话
export function createChat() {
    return Request.post<any>('/chat/v1/record/create', {})
}

export type KeepOnParamsT = {
    content: string; // 聊天内容
} & ChatIdT

// 续写对话
export function keepOnChat(params: KeepOnParamsT, callback: (string) => void) {
    return Request.streamFetch('/chat/v1/record/keep', params, 'post', callback)
}

// 结束对话
export function leaveChat(params: ChatIdT) {
    return Request.put('/chat/v1/record/leave', params)
}

// 获取对话详情
export function getChatDetail(params: ChatIdT) {
    return Request.get<any>('/chat/v1/record/detail', params)
}

// 获取对话列表
export function getChatList() {
    return Request.get<any>('/chat/v1/record/list', {})
}

// 获取历史的新对话
export function getNewChat() {
    return Request.get<any>('/chat/v1/record/lastChat', {})
}