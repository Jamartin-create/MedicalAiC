import { PageParamsT } from '@/api/types'
import { ref } from 'vue'

export interface UseScrollT {
    callback: (pageParams: PageParamsT) => any // 默认必传回分页参数
    direction?: 'up' | 'down' // 触底监测还是触顶监测
    pageOptions?: PageParamsT
}

// 使用滚动
export default function useScroll(params: UseScrollT) {
    const { callback, direction, pageOptions } = params

    // 分页
    const pageParams = ref<PageParamsT>({ pageIndex: 0, pageSize: 20 })

    // 如果定义了初始化的数据
    if (pageOptions) pageParams.value = { ...pageOptions }

    // 监测滚动事件
    function handleScroll(e: Event) {
        // clientHeight：元素在可视区域内的高度
        // scrollHeight：元素的真实高度
        // scrollTop：元素滚动的高度
        const { clientHeight, scrollHeight, scrollTop } =
            e.target as HTMLElement

        if (direction === 'up' && scrollTop !== 0) {
            // 触顶检测
            return
        } else if (
            (!direction || direction === 'down') &&
            clientHeight + scrollTop !== scrollHeight
        ) {
            // 触底检测
            return
        }
        if (!callback) return
        callback({ ...pageParams.value }) // 浅拷贝一下，因为后面要改变值了

        pageParams.value.pageIndex += 1 // 查询后开始翻页
    }

    // 重置分页参数
    function resetPage() {
        pageParams.value = { pageIndex: 0, pageSize: 20 }
        if (pageOptions) pageParams.value = { ...pageOptions }
    }

    return {
        pageParams,
        resetPage,
        handleScroll
    }
}
