<template>
  <Navbar />
  <SideBar />
  <CreateEventModal v-if="showCreateEventModal" />
  <UpdateEventModal v-if="showUpdateEventModal" />
  <DetailEventModal v-if="showDetailEventModal" />
  <main class="mt-16">
    <div class="flex">
      <div :class="showSidebarClass">
        <router-view />
      </div>
    </div>

  </main>
</template>

<script setup>
import store from "../store";
import SideBar from "./SideBarApp.vue";
import Navbar from "./Navbar.vue";
import CreateEventModal from "../components/Dashboard/Modals/CreateEvent.vue"
import UpdateEventModal from "../components/Dashboard/Modals/UpdateEvent.vue"
import DetailEventModal from "../components/Dashboard/Modals/DetailEvent.vue"

import { computed } from "vue";

  const showSidebarClass = computed(()=>store.state.sideBar.show?"mx-auto flex-1 transition-all ml-[250px] p-5":"mx-auto flex-1 transition-all ml-0 p-5")
  const showCreateEventModal = computed(()=>store.state.popup.showModalCreateEvent)
  const showUpdateEventModal = computed(()=>store.state.popup.showModalUpdateEvent)
  const showDetailEventModal = computed(()=>store.state.popup.showModalDetailEvent)
</script>
