import { getAliOssSTS } from '@/api/upload'
import { notify } from '@/components/Notification'
import OSS from 'ali-oss'

// 阿里云对象存储服务前端插件
export class AliOssClient {
    static client: OSS
    static async getInstance(): Promise<OSS> {
        if (!AliOssClient.client) {
            const { code, data } = await getAliOssSTS() // 获取权限码
            if (code !== 0) {
                notify('获取存储权限失败')
                throw new Error('获取存储权限失败')
            }
            // 注册对象存储前端服务
            AliOssClient.client = new OSS({
                region: 'oss-cn-beijing',
                accessKeyId: data.AccessKeyId,
                accessKeySecret: data.AccessKeySecret,
                stsToken: data.SecurityToken,
                bucket: 'medical-ai-server',
                refreshSTSToken: async () => {
                    const { data } = await getAliOssSTS()
                    return {
                        accessKeyId: data.AccessKeyId as string,
                        accessKeySecret: data.AccessKeySecret as string,
                        stsToken: data.SecurityToken as string
                    }
                }
            })
        }
        return AliOssClient.client
    }
}
