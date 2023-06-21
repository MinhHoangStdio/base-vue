<template>

  <header class="bg-white shadow h-16 w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed top-0 left-0 right-0 z-10">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <router-link :to="{ name: 'dashboard' }" class="flex ml-2 mr-4">
            <img src="../assets/logo-stdio.png" class="h-8 mr-3 rounded-full" alt="FlowBite Logo" />

            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Mini tools</span>
          </router-link>
          <button @click="toggleSidebar" class="h-6"><img class="w-full h-full" src="../assets/menu.svg" alt="FlowBite Logo" /></button>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <router-link :to="{ name: 'dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                    Dashboard
                  </router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                    Events
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'dashboard' }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                    Users
                  </router-link>
                </li>

                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import store from "../store";

const toggleSidebar = () => {
  store.commit("toggleSideBar");
};
</script>
