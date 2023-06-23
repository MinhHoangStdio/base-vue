<script setup >
    import { computed } from "vue"
    import store from "../../../store"
    import {displayStatusLabel} from "../../../util/dispayStatusLabel"
    import {convertDateFirebase} from "../../../util/firebaseHelper"

    const eventDetail = computed(()=>store.state.eventDetail)
    
    const closePopup = () => {
        store.commit("closeModalDetailEvent")
    }
    const openUpdateEventModal = () => {
        store.commit("closeModalDetailEvent")
        store.commit("openModalUpdateEvent")

    }
</script>

<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="rounded-md w-[900px] min-h-[300px] max-h-[500px] overflow-auto bg-white" @click.stop>
      <div class="
					bg-white
					border-b border-gray-300
					p-4
					rounded-t-md
					flex
					items-center
					justify-between
				">
        <div class="flex items-center gap-2">
          <div class="text-lg font-semibold">
            {{ eventDetail.title }}
          </div>
          <div class="bg-slate-700 text-white py-1 rounded-full px-3 font-semibold">
            {{ displayStatusLabel(eventDetail.status) }}
          </div>
        </div>

        <div @click="closePopup" class="flex items-center justify-center rounded-full border text-neutral-500 border-neutral-300 w-8 h-8 cursor-pointer bg-white hover:bg-neutral-100">
          X
        </div>
      </div>
      <div class="px-4 py-1 grid grid-cols-12">
        <div class="flex flex-col col-span-5 gap-3">
          <p><b>Assign</b>: {{ eventDetail.assign.firstName }}</p>
          <p><b>Description</b>: {{ eventDetail.description }}</p>
          <p><b>Status</b>: {{ displayStatusLabel(eventDetail.status) }}</p>
          <p><b>Created at</b>: {{ convertDateFirebase(eventDetail.createdAt) }}</p>
        </div>
        <div class="col-span-7">
          <p><b>List Actions</b></p>
          <div class="listItem border rounded-lg p-3 mt-1 h-[200px] overflow-auto">
            <div v-for="action in eventDetail.actions" :key="action.description" class="flex justify-between items-start mb-3 itemAction">
              <div class="text-sm ">{{ action.description }}</div>
              <div class="text-xs border bg-slate-300 rounded-full px-4 py-1 text-[#393939]">{{ convertDateFirebase(action.createdAt) }}</div>
            </div>
          </div>
        </div>

      </div>
      <div class="  
					bg-white
					p-4
					rounded-b-md
					flex
          justify-end
				">
        <button @click="openUpdateEventModal" class="primary-btn">Update Event</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.itemAction {
  color: #5e5e5e;
}
.listItem .itemAction:first-child {
  color: #565656;
  font-weight: bold;
  margin-top: 4px;
}
</style>