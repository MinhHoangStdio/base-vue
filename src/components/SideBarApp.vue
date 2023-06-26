<template>
  <div :class="showSidebarClass">
    <div class="p-2">
      <ul class="space-y-2 font-medium">
        <router-link :to="{ name: 'dashboard' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span class="ml-3">Dashboard</span>
        </router-link>

        <router-link :to="{ name: 'events' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path>
          </svg>
          <span class="flex-1 ml-3 whitespace-nowrap">Events</span>
        </router-link>

        <router-link :to="{ name: 'users' }" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
          <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
        </router-link>

        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3125 8.0625L20.25 12L16.3125 15.9375" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.75 12H20.25" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.75 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9.75" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="flex-1 ml-3 whitespace-nowrap" @click="logout">Log out</span>
        </a>

        <div class="flex items-center p-2">
          <div class="mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="#9CA3AF" stroke-width="2" stroke-miterlimit="10" />
              <path d="M2.90625 20.2508C3.82775 18.6544 5.15328 17.3287 6.74958 16.407C8.34588 15.4853 10.1567 15 12 15C13.8433 15 15.6541 15.4853 17.2504 16.407C18.8467 17.3287 20.1722 18.6544 21.0938 20.2508" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div class="flex flex-col">
            <span class=" text-white">{{ user?.firstName + " " + user?.lastName  }}</span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";

const me = JSON.parse(localStorage.getItem('me'))

const user = computed(() => store.state.user.data || me)

const showSidebarClass = computed(() => {
  return store.state.sideBar.show
    ? "bg-slate-500 w-[250px] transition-all translate-x-0 fixed top-[64px] bottom-0"
    : "bg-slate-500 w-[250px] transition-all translate-x-[-100%] fixed top-[64px] bottom-0";
});

function logout() {
  store.dispatch("logout");
}
</script>
