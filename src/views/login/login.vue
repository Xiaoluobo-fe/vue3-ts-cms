<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <!-- 标题 -->
        <h2 class="login-title">欢迎登录</h2>

        <!-- 登录表单 -->
        <el-form
          class="login-form"
          ref="formRef"
          :model="loginForm"
          :rules="rules"
        >
          <!-- 用户名 -->
          <el-form-item prop="userName">
            <el-input
              placeholder="请输入用户名"
              :prefix-icon="userIcon"
              size="large"
              v-model="loginForm.userName"
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              :prefix-icon="lockIcon"
              show-password
              size="large"
              v-model="loginForm.password"
            />
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { loginUser } from '@/api/login/login'
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import saveInfo from '@/hooks/useLocalStory'
export default {
  setup() {
    const loading = ref(false)
    const loginForm = reactive({
      userName: '',
      password: ''
    })
    const formRef = ref<FormInstance>()
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })
    const userIcon = User
    const lockIcon = Lock

    const handleLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          loginUser(loginForm).then((res) => {
            if (res.data) {
              saveInfo('accessToken', res.data.data.token.accessToken)
            }
          })
        }
      })
    }
    return {
      loading,
      loginForm,
      formRef,
      rules,
      userIcon,
      lockIcon,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 420px;
}

.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.5s ease;
}

.login-title {
  text-align: center;
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.login-form {
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
