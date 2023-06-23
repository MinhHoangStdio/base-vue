<template>
  <div class="flex items-center justify-center h-screen bg-gray-200">
    <div class="max-w-md mx-auto">
      <h1 class="text-6xl font-bold text-gray-800">404</h1>
      <p class="mt-2 mb-4 text-xl text-gray-600">Oops! Trang này không tồn tại.</p>
      
      <router-link
        to="/"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >Trang chủ</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>