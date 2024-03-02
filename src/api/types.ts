// 分页请求
export type PageParamsT = {
    pageIndex: number;
    pageSize: number;
}

// 分页结果
export type PageResultT = {
    list: any[];
    total: number;
    pageCount: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

// 消息对象
export type MessageT = {
    role: 'assistant' | 'user';
    content: string;
}