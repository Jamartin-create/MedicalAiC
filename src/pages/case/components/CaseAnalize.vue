<template>
    <v-sheet
        class="ana-panel-wrp preset-bg-light w-100 h-100 rounded-xl px-2 py-2 d-flex justify-center"
    >
        <v-sheet class="w-75 py-6" v-if="caseid">
            <CustomMessageCard role="assistant" :content="text" />

            <div class="msg-generate-loading">
                <v-progress-circular
                    v-if="generating"
                    size="20"
                    width="2"
                    indeterminate
                    class="mb-10"
                    color="black"
                />
            </div>
        </v-sheet>
        <!-- 空时 -->
        <v-sheet v-else class="w-100 h-100 d-flex justify-center align-center">
            我是你的专属私人医生，告诉我你的症状叭～
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import { genAnalize } from '@/api/case'
import CustomMessageCard from '@/components/CustomMessageCard.vue'
import { Typewriter } from '@/utils/typeingWriter'
import { ref, watch } from 'vue'

type PropsT = {
    caseid: string
}
const props = defineProps<PropsT>()

const generating = ref<boolean>(false)
const text = ref<string>('')

const handleGenOverwrite = async (caseid: string) => {
    generating.value = true

    const typer = new Typewriter((str: string) => {
        text.value += str || ''
    })

    try {
        typer.start()
        await genAnalize({ caseid }, (chunk: string) => {
            typer.add(chunk)
        })
    } catch (e) {
        console.log(e)
    } finally {
        typer.done()
        generating.value = false
    }
}

watch(
    () => props.caseid,
    n => {
        handleGenOverwrite(n)
    }
)
</script>

<style scoped lang="scss">
.ana-panel-wrp {
    overflow: scroll;
    .msg-generate-loading {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>
