/** @description 数据字典，用于对比 code 获取中文，比如计划状态：0=进行中…… */

import { ref } from 'vue'

export type DataDirTypeT =
    | 'caseSituation'
    | 'caseFeedBackStatus'
    | 'planType'
    | 'planStatus'

export type DataDirT = {
    [key in number]: string
}

export default function useDataDir(type: DataDirTypeT) {
    const dataDir = ref<DataDirT>({
        0: '正常',
        1: '不正常'
    })
    if (type === 'caseSituation') {
        dataDir.value = {
            0: '差',
            1: '一般',
            2: '好'
        }
    } else if (type === 'caseFeedBackStatus') {
        dataDir.value = {
            0: '生病中',
            1: '已痊愈'
        }
    } else if (type === 'planType') {
        dataDir.value = {
            0: '康复',
            1: '养生'
        }
    } else if (type === 'planStatus') {
        dataDir.value = {
            0: '进行中',
            1: '已结束',
            2: '中断'
        }
    }

    function getValue(key: number) {
        return dataDir.value[key]
    }

    return {
        dataDir,
        getValue
    }
}
