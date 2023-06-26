<template>
  <div
    class="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500"
  >
    <div class="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 pb-10 pt-2">
        Login
      </h2>
      <form @keyup.enter="handleLogin">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-3"
            for="username"
          >
            Username
          </label>
          <input
            v-model="username"
            class="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-3"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            class="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div class="flex items-center justify-end">
          <button
            class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="button"
            @click="handleLogin"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const username = ref("");
const password = ref("");
const store = useStore();

const handleLogin = () => {
  const credentials = {
    username: username.value,
    password: password.value,
  };
  store.dispatch("login", credentials);
};
</script>
