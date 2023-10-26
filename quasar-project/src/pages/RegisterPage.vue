<template>
  <div class="body">
    <h4>Register!!</h4>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button class="intb" @click="register">Register</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../../src/boot/firebase'

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = async () => {
      try {
        await auth.createUserWithEmailAndPassword(email.value, password.value);
        router.push('/login');
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin:  0 auto;
  margin-top: 10%;
  gap: 10px;
}

input {
  border-color: rgba(53, 130, 231, 0.582);
  outline: none;
  padding: 10px;
  border-radius: 10px;
}

.intb {
  padding: 10px;
  background: rgba(53, 130, 231, 0.582);
  outline: none;
  border: none;
}
</style>
