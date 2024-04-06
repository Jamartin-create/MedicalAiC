<template>
    <!-- 登录/注册页面布局框架 -->
    <v-layout class="auth-wrapper">
        <div class="auth-wrapper-left">
            <div class="page-logo">
                <img class="kf-updown" :src="Logo" />
                <div>Medical-Ai</div>
            </div>
            <div class="page-description">
                High quality and healthy lifestyle assistant
                <p class="text-right">你的高质量健康生活小助手 ~</p>
            </div>
        </div>
        <v-divider :vertical="true" />
        <div class="auth-wrapper-right">
            <RouterView v-slot="{ Component }">
                <Transition name="page" mode="out-in">
                    <component :is="Component"></component>
                </Transition>
            </RouterView>
        </div>
    </v-layout>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.auth-wrapper {
    height: 100%;
    display: flex;
    align-items: center;

    .auth-wrapper-left {
        width: 80%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .page-logo {
            display: flex;
            align-items: center;
            font-size: 50px;

            img {
                height: 80px;
                margin-right: 20px;
            }
        }

        .page-description {
            font-size: 20px;
            margin-top: 20px;

            &::before {
                content: '—— ';
            }
        }
    }

    .auth-wrapper-right {
        width: 50%;
    }
}
</style>
