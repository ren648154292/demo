<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">后台管理系统</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            @input="handleInput('username')"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            @input="handleInput('password')"
          />
        </el-form-item>

        <el-form-item prop="remember" class="remember-item">
          <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>

        <div class="third-login">
          <div class="third-title">其他登录方式</div>
          <div class="third-icons">
            <el-icon :size="24" class="icon-item"><Connection /></el-icon>
            <el-icon :size="24" class="icon-item"><Iphone /></el-icon>
            <el-icon :size="24" class="icon-item"><SwitchFilled /></el-icon>
            <el-icon></el-icon>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Connection, Iphone, SwitchFilled } from '@element-plus/icons-vue'
import { useLogin } from '@/hooks/useLogin'

const {
  loginFormRef,
  loading,
  loginForm,
  loginRules,
  handleInput,
  handleLogin,
} = useLogin()
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #409eff, #79bbff);
}

.login-box {
  width: 450px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #303133;
  margin-bottom: 35px;
  font-size: 24px;
}

.login-form {
  .remember-item {
    margin-bottom: 22px;
  }

  .login-btn {
    width: 100%;
    height: 40px;
  }
}

.third-login {
  margin-top: 30px;
  text-align: center;
  .third-title {
    color: #999;
    font-size: 14px;
    margin-bottom: 15px;
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 25%;
      height: 1px;
      background: #eee;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  .third-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    .icon-item {
      cursor: pointer;
      color: #666;
      transition: color 0.3s;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
