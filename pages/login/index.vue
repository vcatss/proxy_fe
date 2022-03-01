<template>
  <div class="flex flex-wrap w-full h-screen justify-center items-center">
    <div class="flex-noshink w-[400px] shadow-md p-6 rounded-lg grid grid-cols-1 gap-3">
      <el-input
        placeholder="Username"
        suffix-icon="el-icon-user"
        v-model="model.username"
      >
      </el-input>
      <el-input
        placeholder="Password"
        v-model="model.password"
        show-password
      ></el-input>
      <div class="w-full grid grid-cols-2 gap-3">
        <el-button @click="login()" type="primary" plain>Login</el-button>
        <el-button type="success" plain>Register</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'blank',
    data(){
        return {
            model: {
                username: "1",
                password: "1",
            }
        }
    },
    methods: {
        async login() {
            let x = await this.$auth.loginWith('local1', {
                email: this.model.username,
                password: this.model.password,
            })
        }
    }
};
</script>

<style>
</style>