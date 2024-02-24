<template>
    <v-container>
        <v-row align="center" no-gutters class="px-16 py-5">
            <img class="kf-updown form-wrp-logo" :src="Logo" />
        </v-row>
        <v-row align="center" no-gutters class="px-16 py-5">
            <div class="form-wrp-header">
                <div class="say-hello">Hey! Hello, 🙋</div>
                <div class="say-hello-tips">健康生活 EveryDay~</div>
            </div>
        </v-row>
        <v-row align="center" no-gutters class="px-16">
            <!-- 密码登录 -->
            <slot></slot>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png'
</script>

<style scoped lang="scss">
.form-wrp-logo {
    width: 50px;
}

.form-wrp-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 25px;
    .say-hello {
        font-size: 30px;
        font-weight: bold;
    }
    .say-hello-tips {
        font-size: 16px;
        color: rgba($color: #000000, $alpha: 0.5);
    }
}
</style>
