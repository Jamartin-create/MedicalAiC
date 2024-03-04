<template>
    <v-sheet
        rounded="xl"
        class="ana-panel-wrp preset-bg-light w-100 h-100 px-2 py-2 d-flex justify-center"
    >
        <v-sheet class="w-75 py-6" v-if="recordid">
            <CustomMessageCard role="assistant" :content="text" />
        </v-sheet>
    </v-sheet>
</template>

<script setup lang="ts">
import CustomMessageCard from '@/components/CustomMessageCard.vue'
import { Typewriter } from '@/utils/typeingWriter'
import { genRecordAna } from '@/api/plan'
import { ref, watch } from 'vue'

type PropsT = {
    recordid: string
}
const props = defineProps<PropsT>()

const generating = ref<boolean>(false)
const text = ref<string>('')

const handleGenOverwrite = async (recordid: string) => {
    generating.value = true

    const typer = new Typewriter((str: string) => {
        text.value += str || ''
    })

    try {
        typer.start()
        await genRecordAna({ recordid }, (chunk: string) => {
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
    () => props.recordid,
    n => {
        handleGenOverwrite(n)
    }
)
</script>

<style scoped>
.ana-panel-wrp {
    overflow: scroll;
}
</style>
