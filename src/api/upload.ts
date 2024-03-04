import { Request } from '@/utils/request'

// 获取 oss 服务签名
export function getAliOssSTS() {
    return Request.get<any>('/oss/v1/sts/', {})
}
