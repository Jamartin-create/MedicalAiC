<script setup lang="ts">
import { getCheckList, getTodoList } from '@/api/plan'
import CustomHead from '@/components/CustomHead.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const todolist = ref<any[]>()

const loadData = async () => {
    try {
        const { code, data } = await getTodoList()
        if (code !== 0) return
        todolist.value = data
        loadCheckData()
    } catch (e) {
        console.log(e)
    }
}

const loadCheckData = async () => {
    try {
        const { code, data } = await getCheckList()
        if (code !== 0) return
        todolist.value?.forEach(item => {
            if (data.includes(item.uid)) item.isCheck = true
        })
        console.log(data)
    } catch (e) {
        console.log(e)
    }
}

onMounted(() => {
    loadData()
})

// 其他逻辑
const toCheck = (uid: string) => {
    router.push({ name: 'RecordCreate', query: { id: uid } })
}
</script>

<template>
    <div class="panel-wrp preset-bg-light w-100 h-100 rounded-xl px-2 py-2">
        <CustomHead title="Todo" />
        <v-sheet class="bg-transparent px-2">
            <template v-for="item in todolist">
                <v-hover>
                    <template v-slot:default="{ isHovering, props: p2 }">
                        <v-list-item
                            v-if="!item.isCheck"
                            v-bind="p2"
                            class="w-100 cursor-pointer d-flex justify-space-between"
                            @click="toCheck(item.uid)"
                        >
                            <v-tooltip :text="item.title" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-sheet v-bind="props" class="todo-title">
                                        <v-icon class="mdi mdi-circle-small" />
                                        {{ item.title }}
                                    </v-sheet>
                                </template>
                            </v-tooltip>
                            <template #append v-bind="p2">
                                <template v-if="isHovering">
                                    <v-icon
                                        class="mdi mdi-checkbox-intermediate"
                                    />
                                </template>
                                <template v-else>
                                    <v-icon
                                        class="mdi mdi-checkbox-blank-outline"
                                    />
                                </template>
                            </template>
                        </v-list-item>
                        <v-list-item class="cursor-pointer" v-else>
                            <v-tooltip :text="item.title" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-sheet
                                        v-bind="props"
                                        class="todo-title text-decoration-line-through"
                                    >
                                        <v-icon class="mdi mdi-circle-small" />
                                        {{ item.title }}
                                    </v-sheet>
                                </template>
                            </v-tooltip>
                        </v-list-item>
                    </template>
                </v-hover>
            </template>
        </v-sheet>
    </div>
</template>

<style lang="scss" scoped>
.panel-wrp {
    box-sizing: border-box;

    .todo-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
