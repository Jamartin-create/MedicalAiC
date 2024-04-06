import { notify } from '@/components/Notification'
import { AliOssClient } from '@/plugins/alioss'

export type UploadTypeT = 'aliyunoss'

// 生成文件名
function generateFileName(name: string) {
    const timestamp = (Date.now() / 1000).toFixed(0).toString()

    // 拆分文件名（文件名 + 后缀的格式）
    const pattern = /^(.+)\.([a-zA-Z0-9]+)$/
    const ext = name.trim().match(pattern)
    // 如果文件名获取失败，则直接以时间戳为文件名
    if (!ext) return timestamp
    // 否则文件名格式为：文件名 + 时间戳 + 后缀
    return ext[1] + timestamp + '.' + ext[2]
}

// 上传
export async function upload(
    file: File,
    _: UploadTypeT = 'aliyunoss'
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            // aliyun oss 插件优化
            const aliOss = await AliOssClient.getInstance()
            const filename = generateFileName(file.name)
            // 直接把 filename 返回存库，每次获取图片地址都通过 signatureUrl 获取
            aliOss.put(filename, file).then(res => resolve(res.url))
        } catch (e: any) {
            notify(e.message) // 失败提示
            reject(e)
        }
    })
}
