<script setup >
    import store from "../../../store"
    import {useForm} from "vee-validate"
    import * as yup from "yup"
    import {serverTimestamp, Timestamp} from 'firebase/firestore'

    const schema = yup.object({
        title: yup.string().required('Please enter title'),
        description: yup.string().required('Please enter description'),
    })
    const { useFieldModel, errors, handleSubmit } = useForm({validationSchema: schema});
    const [title, description] = useFieldModel(['title', 'description']);

    const closePopup = ()=>{
        // console.log('close popup')
        store.commit('closeModalCreateEvent')
    }
    const createEvent = handleSubmit((values)=>{
        // console.log({values})
        const params = {
        ...values,
        status: "created",
        assign: store.state.user.data,
        actions: [
            {
            description: `${store.state.user.data?.firstName} has created a new event`,
            type: "",
            createdAt: Timestamp.now(),
            },
        ],
        createdAt: serverTimestamp(),
        };
        // console.log({params})
        store.dispatch("createEvent",params)
    })


</script>

<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="rounded-md w-[600px] min-h-[300px] bg-white" @click.stop>
      <!-- Nội dung của popup -->
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
          Create a new Event
        </div>
        <div @click="closePopup" class="flex items-center justify-center rounded-full border text-neutral-500 border-neutral-300 w-8 h-8 cursor-pointer bg-white hover:bg-neutral-100">
          X
        </div>
      </div>
      <div class="p-4">
        <form @submit.prevent="createEvent">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
              Title
            </label>
            <input name="title" v-model="title" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.title}" id="title" type="text" placeholder="Title" />
            <span class="text-red-400">{{errors.title}}</span>
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea name="description" v-model="description" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.description}" class="resize-y h-24 shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text-area" placeholder="Description" />
          </div>
          <span class="text-red-400">{{errors.description}}</span>
          <div class="flex justify-end">
            <button type="submit" class="primary-btn">Create</button>
          </div>
        </form>

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
</style>