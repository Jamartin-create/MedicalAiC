<script setup lang="ts">
import { getCheckList, getTodoList } from '@/api/plan'
import CustomHead from '@/components/CustomHead.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TodoListItem from './TodoListItem.vue'
import CustomEmpty from '@/components/CustomEmpty.vue'

const router = useRouter()

const todolist = ref<any[]>([])

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
                <TodoListItem :item="item" @select="it => toCheck(it.uid)" />
            </template>
            <CustomEmpty v-if="!todolist.length">
                暂时没有计划要打卡哦~
            </CustomEmpty>
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
