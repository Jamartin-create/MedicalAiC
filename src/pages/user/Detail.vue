<template>
    <div>
        个人中心
        <v-file-input
            accept="image/*"
            label="File input"
            :loading="loading"
            v-model:model-value="files"
            @update:model-value="handleFileUpload"
        ></v-file-input>
    </div>
</template>

<script setup lang="ts">
import { AliOssClient } from '@/plugins/alioss'
import { upload } from '@/utils/upload'
import { ref } from 'vue'

const files = ref<File[]>([])
const loading = ref<boolean>(false)

AliOssClient.getInstance().then(res => {
    // 有效期一天
    const url = res.signatureUrl('/IMG_3672 21708505066 21708506291.png', { expires: 60 * 60 * 24 })
    console.log('----', url)
})

const handleFileUpload = async (e: File[]) => {
    const file = e[0]

    loading.value = true
    try {
        const res = await upload(file)
        console.log('---', res)
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
    
}
</script>

<style scoped>

</style>