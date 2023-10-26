<!-- Login.vue -->
<template>
  <div class="body">
    <input class="" v-model="email" type="email" placeholder="Email">
    <input clas v-model="password" type="password" placeholder="Password">
    <button class="intb" @click="login">Login</button>
  </div>
</template>

<script>
import {auth } from '../../src/boot/firebase';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    },
  },
};
</script>
<style scoped>
.body{
  display: flex;
  flex-direction: column;
  width: 50%;
  margin:  0 auto;
  margin-top:10%;
  gap:10px;
}
input{
  border-color: rgba(53, 130, 231, 0.582);
  outline: none;
  padding: 10px;
  border-radius: 10px;
}
.intb {
  padding: 10px;
  background:rgba(53, 130, 231, 0.582) ;
  outline: none;
  border: none;
}

</style>
