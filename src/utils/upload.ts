import { notify } from "@/components/Notification"
import { AliOssClient } from "@/plugins/alioss"

export type UploadTypeT = 'aliyunoss'

function generateFileName(name: string) {
    const timestamp = (Date.now() / 1000).toFixed(0).toString()

    const pattern = /^(.+)\.([a-zA-Z0-9]+)$/
    const ext = name.trim().match(pattern)
    if(!ext) return timestamp
    return ext[1] + timestamp + '.' +  ext[2]
}

// 上传
export async function upload(file: File, _: UploadTypeT = 'aliyunoss'): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const aliOss = await AliOssClient.getInstance()
            const filename = generateFileName(file.name)
            // 直接把 filename 返回存库，每次获取图片地址都通过 signatureUrl 获取
            aliOss.put(filename, file).then((res) => resolve(res.url))
        } catch (e: any) {
            notify(e.message)
            reject(e)
        }
    })
}