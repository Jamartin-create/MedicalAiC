import useVuelidate, { Validation } from '@vuelidate/core'
import { Ref, ref } from 'vue'

type MsgsT = string | readonly string[] | null | undefined

type ValidateT<T> = Ref<Record<keyof T, Validation<any, T>>>

interface ValidateType<T> {
    form: Ref<T>
    v$: ValidateT<T>
    clear: () => void
    submit: () => void
    getMsgList: (key: keyof T) => MsgsT
}

interface ValidateOption {
    callback: () => void
}

// 表单验证钩子
export function useFormValidate<T>(
    initForm: T,
    rules: any,
    options: ValidateOption
): ValidateType<T> {
    const form = ref<T>({ ...initForm }) as Ref<T>

    const v = useVuelidate(rules, form)

    const v$ = v as ValidateT<T>

    const clear = () => {
        Object.keys(form.value!).forEach(key => {
            form.value[key as keyof T] = initForm[key as keyof T]
        })
        v.value.$reset()
    }

    const submit = async () => {
        const val = await v.value.$validate()
        if (!val) return
        options && options.callback && options.callback()
    }

    // 获取错误信息
    function getMsgList(key: keyof T): MsgsT {
        return v$.value[key].$errors.map(e => e.$message) as MsgsT
    }

    return {
        v$,
        form,
        clear,
        submit,
        getMsgList
    }
}
