<script setup>
import {convertDateFirebase} from "../../util/firebaseHelper";
import store from "../../store"

const props = defineProps({
	ticket: Object,
});
const handleOpenModalDetail = () =>{
    store.commit("setEventDetail",props.ticket)
    store.commit("openModalDetailEvent")
}
</script>

<template>
  <div @click="handleOpenModalDetail" class="
			bg-white
			p-4
			mb-3
			shadow-md
			border-t border-r border-l border-gray-100
			rounded-md
			flex flex-col-reverse
			space-y-2 space-y-reverse
			relative
			hover:cursor-pointer
		">
    <div>{{ticket.actions[0].description }}</div>
    <div class="text-gray-400 text-sm">
      {{ ticket.assign.firstName }}, {{convertDateFirebase(ticket.actions[0].createdAt) }}
    </div>
    <div class=" flex items-center">

      <span class=" font-semibold">
        {{ ticket.title }}
      </span>
    </div>

  </div>
</template>
