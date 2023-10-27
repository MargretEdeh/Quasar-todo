// Your authentication component file (e.g., GoogleAuth.vue)
<template>
  <div class="google-auth">
    <q-btn class="btn" @click="signInWithGoogle" color="blue">
      Sign in with Google
    </q-btn>


  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore(); 
    const router = useRouter();

    const signInWithGoogle = async () => {
      try {
        const user = await store.dispatch('signInWithGoogle');
        if (user) {
          router.push('/');
        }
      } catch (error) {
        console.error('Google Sign-in Error', error.message);
      }
    };

    return {
      signInWithGoogle,
    };
  },
};
</script>
<style scoped>
.google-auth {
  margin: 0 auto;
  display: flex;
  /* align-items: center; */
  /* margin-top: 10%; */

}
.btn{
  padding: 20px;
  margin: 10% auto;
}
</style>
