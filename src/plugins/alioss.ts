import { getAliOssSTS } from "@/api/upload";
import { notify } from "@/components/Notification";
import OSS from "ali-oss";


// 唯一路由
export class AliOssClient {
    static client: OSS
    static async getInstance(): Promise<OSS> {
        if (!AliOssClient.client) {
            const { code, data } = await getAliOssSTS()
            if (code !== 0) {
                notify('获取存储权限失败')
                throw new Error("获取存储权限失败")
            }
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

  