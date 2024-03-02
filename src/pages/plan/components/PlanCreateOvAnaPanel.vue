<template>
    <v-sheet class="ana-panel-wrp preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex justify-center">
        <v-sheet class="w-75 py-6" v-if="planid">
            <CustomMessageCard role="assistant" :content="text" />
        </v-sheet>
        <!-- 空时 -->
        <v-sheet v-else class="w-100 h-100 d-flex justify-center align-center">
            我是你的规划助理，输入你的想法，点击创建，我就会自动为你生成计划总览啦～
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { genOverwrite } from '@/api/plan'
import CustomMessageCard from '@/components/CustomMessageCard.vue';
import { Typewriter } from '@/utils/typeingWriter';
import { ref, watch } from 'vue';


type PropsT = {
    planid: string
}
const props = defineProps<PropsT>()

const generating = ref<boolean>(false)
const text = ref<string>('')

const handleGenOverwrite = async (planid: string) => {
    generating.value = true

    const typer = new Typewriter((str: string) => {
        text.value += str || ''
    })

    try {
        typer.start()
        await genOverwrite({ planid },
            (chunk: string) => {
                typer.add(chunk)
            }
        )
    } catch (e) {
        console.log(e)
    } finally {
        typer.done()
        generating.value = false
    }
}

watch(() => props.planid, (n) => {
    handleGenOverwrite(n)
})

</script>

<style scoped>
.ana-panel-wrp {
    overflow: scroll;
}
</style>