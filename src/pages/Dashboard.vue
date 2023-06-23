
<script setup>
import { Timestamp } from "firebase/firestore";
import { ref, computed, onMounted } from "vue";
import draggable from "vuedraggable";
import Ticket from "../components/Dashboard/Ticket.vue";
import store from "../store"
import {displayStatusLabel} from "../util/dispayStatusLabel"

const currentUser = store.state.user.data
const lists = computed(()=>store.state.listEvents.data)
console.log({lists})
const isLoadingListEvents = computed(()=>store.state.listEvents.isLoading)
const user = store.state.user.data

onMounted(async()=>{
	store.dispatch("getListEvents")
	store.dispatch("getListUsers")

	store.dispatch("getAccountUser")

	if (user) {
		store.dispatch("writeUserToFireStore", user)
	}
})

const dragOptions = computed(() => {
	return {
		animation: 200,
		disabled: false,
		ghostClass: "ghost",
	};
});

function handleChange(e,listEvents=null){
	// console.log(listEvents.find(list=>list.label_status === e.to.getAttribute("data-id")).events[e.newIndex])
	// console.log({from:e.from.getAttribute("data-id")});console.log({to:e.to.getAttribute("data-id")}); console.log({e})
	// console.log({...changedEvent, status: e.to.getAttribute("data-id")})
	// console.log({e})
	const changedEvent = listEvents.find(list=>list.label_status === e.to.getAttribute("data-id")).events[e.newIndex]
	// console.log({changedEvent})

	const params = {
		...changedEvent,
		status: e.to.getAttribute("data-id"),
		actions: [{
			description: `${currentUser?.firstName} changed the status to ${displayStatusLabel(e.to.getAttribute("data-id"))}`,
			type:'',
			createdAt: Timestamp.now()
		},...changedEvent.actions]
	}
	console.log({params})
	if(displayStatusLabel(e.to.getAttribute("data-id"))!==displayStatusLabel(e.from.getAttribute("data-id"))){
		console.log('Bắn')
		store.dispatch("updateStatusAnEvent",params)
	}

}

const handleOpenCreateEventModal = () =>{
	store.commit("openModalCreateEvent")
	console.log(currentUser.firstName)
} 


</script>

<template>
  <!-- loading -->
  <div v-if="isLoadingListEvents">
    Loading...
  </div>

  <!-- content  -->
  <div v-else>
    <div class="flex items-center gap-4	">
      <h1 class="font-bold text-2xl">Events</h1>
      <button @click="handleOpenCreateEventModal" class="primary-btn">Add new event</button>
    </div>
    <div class="grid grid-cols-4 gap-3 mt-2">
      <div v-for="list in lists" :key="list.label_status" class="border border-gray-300 rounded-md bg-gray-50">
        <div class="
					bg-white
					border-b border-gray-300
					p-4
					rounded-t-md
					flex
					items-center
					justify-between
				">
          <div class="text-lg font-semibold">
            {{ displayStatusLabel(list.label_status) }}
          </div>

          <div class="flex items-center space-x-4">
            <!-- <button v-if="list.label_status == 'done'" class="text-blue-500 hover:text-blue-700 font-semibold">
            Clear all
          </button> -->

            <span class="
							block
							py-1
							px-3
							bg-gray-200
							rounded-xl
							text-sm
							font-semibold
						">
              {{ list.events.length }}
            </span>
          </div>
        </div>

        <div class="p-4 h-full">
          <draggable :data-id="list.label_status" @end="(event)=>handleChange(event, lists)" class="min-h-full" :list="list.events" group="tickets" itemKey="name" v-bind="dragOptions">
            <template #item="{ element }">
              <Ticket :ticket="element" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>

</template>
