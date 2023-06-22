<script setup >
    import store from "../../../store"
    import {useForm} from "vee-validate"
    import * as yup from "yup"
    import {serverTimestamp, Timestamp} from 'firebase/firestore'
    import { computed } from "vue"
    import {compareString} from "../../../util/compareString"

    const listUsers = computed(()=>store.state.listUsers.data)
    const listUser = store.state.listUsers.data
    const eventDetail = store.state.eventDetail


    const schema = yup.object({
        title: yup.string().required('Please enter title'),
        assign: yup.string().required('Please select assign'),
        status: yup.string().required('Please select status'),
        description: yup.string().required('Please enter description'),
        actions: yup.array().of(
            yup.object().shape({
                description: yup.string(),
                type: yup.string(),
      })
    ),
    })
    const { useFieldModel, errors, handleSubmit, setFieldValue } = useForm({
        validationSchema: schema, 
        initialValues:{
            title:store.state.eventDetail.title || "",
            assign:store.state.eventDetail.assign.firstName || "",
            status:store.state.eventDetail.status || "", 
            description:store.state.eventDetail.description || "",
            actions:[]
        }
    });
    const [title, description, assign, status, actions] = useFieldModel(['title', 'description', 'assign', 'status', 'actions']);

    const closePopup = ()=>{
        store.commit('closeModalUpdateEvent')
    }

    const handleAddAnotherActivity = ()=>{
        // console.log(actions.value)
        // console.log({errors})
        if(actions.value.length === 0){    
            // console.log('yolo')
            const action = [
                {
                    description: "",
                    type: "default",
                },
            ];
            setFieldValue('actions',action)}
    }

    const removeActivity = () => {
        setFieldValue('actions',[])
    }

    const updateEvent = handleSubmit((values)=>{

    const findUser = listUser.filter(
      (user) => user.firstName === assign.value
    );
    const newActions =
      actions.value.length > 0 && !!actions.value[0].description.trim() && !!actions.value[0].type.trim()
        ? [
            {
              ...actions.value[0],
              description: `${listUser[0]?.firstName}: ${actions.value[0].description}`,
              createdAt: Timestamp.now(),
            },
          ]
        : [];

    if (!compareString(title.value, eventDetail.title)) {
      newActions.push({
        type: "",
        description: `${listUser[0]?.firstName} changed the title to ${title.value}`,
        createdAt: Timestamp.now(),
      });
    }



    if (!compareString(assign.value, eventDetail.assign.firstName)) {
      newActions.push({
        type: "",
        description: `${listUser[0]?.firstName} changed the assign to ${assign.value}`,
        createdAt: Timestamp.now(),
      });
    }

    // console.log({values,newActions, eventDetail})  

    if (!compareString(status.value, eventDetail.status)) {
      newActions.push({
        type: "",
        description: `${
          listUser[0]?.firstName
        } changed the status to ${displayStatusLabel(status.value)}`,
        createdAt: Timestamp.now(),
      });
    }

    if (!compareString(description.value, eventDetail.description)) {
      newActions.push({
        type: "",
        description: `${listUser[0]?.firstName} changed the description`,
        createdAt: Timestamp.now(),
      });
    }

    const rawParams = {
      ...values,
      assign: findUser[0],
      actions: [...newActions, ...eventDetail.actions],
      is_done: values.status === "done",
    };
    const params = {...eventDetail, ...rawParams}

    store.dispatch("updateEvent",params)

    })


</script>

<template>
  <div class="popup-overlay" @click="closePopup">
    <div class="rounded-md w-[800px] min-h-[300px] bg-white" @click.stop>
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
          Update an Event
        </div>
        <div @click="closePopup" class="flex items-center justify-center rounded-full border text-neutral-500 border-neutral-300 w-8 h-8 cursor-pointer bg-white hover:bg-neutral-100">
          X
        </div>
      </div>
      <div class="p-4">
        <form @submit.prevent="updateEvent">
          <div class="mb-4">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                  Title
                </label>
                <input name="title" v-model="title" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.title}" id="title" type="text" placeholder="Title" />
                <span class="text-red-400">{{errors.title}}</span>
              </div>

              <div class="col-span-3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="assign">
                  Assign
                </label>
                <select name="assign" v-model="assign" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.assign}" id="assign">
                  <option v-for="user in listUsers" :key="user.id" :value="user.firstName">{{ user.firstName }}</option>
                </select>
                <span class="text-red-400">{{errors.assign}}</span>
              </div>

              <div class="col-span-3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                  Status
                </label>
                <select name="status" v-model="status" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.status}" id="status">
                  <option value="created">Todo</option>
                  <option value="in_progress">In progress</option>
                  <option value="done">Done</option>
                  <option value="close">Close</option>
                </select>
                <span class="text-red-400">{{errors.status}}</span>
              </div>
            </div>

          </div>

          <div>
            <div class="mb-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                Description
              </label>
              <textarea name="description" v-model="description" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':errors.description}" class="resize-y h-24 shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text-area" placeholder="Description" />
            </div>
            <span class="text-red-400">{{errors.description}}</span>
          </div>
          <button type="button" @click="handleAddAnotherActivity" class="primary-btn">Add another activity</button>

          <div v-for="(action,index) in actions" :key="index">
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-8">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="ant-description">
                  Description
                </label>
                <input name="actions[index].description" v-model="actions[index].description" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':
                errors.actions && errors.actions[index] &&errors.actions[index].description}" id="ant-description" type="text" placeholder="Title" />
              </div>
              <div class="col-span-3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="atd-type">
                  Type
                </label>
                <input name="actions[index].type" v-model="actions[index].type" class="shadow appearance-none border border-gray-200  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-400 focus:border-red-400 focus:ring-0 focus:ring-offset-0':
                 errors.actions && errors.actions[index] &&errors.actions[index].type}" id="atd-type" type="text" placeholder="Type" />
              </div>
              <div class="col-span-1 ">
                <div class="flex items-end h-full">
                  <div @click="removeActivity" class="ml-[9px] mb-[2px] flex items-center justify-center rounded-full border text-neutral-500 border-neutral-300 w-8 h-8 cursor-pointer bg-white hover:bg-neutral-100">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-[60px]">
            <button type="submit" class="primary-btn">Update</button>
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