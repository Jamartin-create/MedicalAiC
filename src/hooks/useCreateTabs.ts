import { ref } from 'vue'

type KeyT = {
    label: string
    value: string
}

// 默认 label 和 value 的 key
const defaultKeys: KeyT = {
    label: 'label',
    value: 'value'
}

// 第二个参数
type OptionsT = {
    callback?: Function
    defaultActive?: string | number
}

// 最终暴露给业务的列表
type ExportTabT<T> = {
    meta: T
    value: string | number
    label: string
    active: boolean
}

// 快速创建 Tab hook
export default function useCreateTabs<T>(
    tabItems: T[],
    options: OptionsT,
    keys: KeyT = { ...defaultKeys }
) {
    // 先处理形参
    const { label, value } = keys // 键值对的 key，比如说一个数组：[text: 'a', name: '123']，这里 label 就是 text，value 就是 name
    const { callback, defaultActive } = options

    // 搞个默认值
    const active = ref<string | number>(tabItems[0][value])
    if (defaultActive) active.value = defaultActive

    // 初始化 tab 列表（这里固定格式为 label、value……）
    const items = ref<ExportTabT<T>[]>(
        tabItems.map(item => {
            return {
                label: item[label],
                value: item[value],
                meta: item,
                active: item[value] === active.value
            }
        })
    )

    // 处理选中
    function handleChangeTab(tabValue: string | number) {
        let flag1 = false
        let flag2 = false
        let actMeta: any = null
        for (const item of items.value) {
            if (flag1 && flag2) break
            // 取消之前的选中
            if (item.value === active.value) {
                item.active = false
                flag1 = true
            }
            // 补充新的选中并告诉外层捕获的是哪个tab好让其做出反应
            if (item.value === tabValue) {
                actMeta = item.meta
                item.active = true
                flag2 = true
            }
        }
        active.value = tabValue
        if (callback && actMeta) callback(actMeta)
    }

    return {
        active,
        items,
        handleChangeTab
    }
}
