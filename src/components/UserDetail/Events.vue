<script setup>
import { convertDateFirebase } from "../../util/firebaseHelper";

const props = defineProps({
  tasks: Object,
  countTask: Object,
});

const displayStatus = (status) => {
  switch (status) {
    case "created":
      return '<div class="status created"><span>Created</span></div>';
    case "in_progress":
      return '<div class="status inprocess"><span>In Process</span></div>';
    case "done":
      return '<div class="status done"><span>Done</span></div>';
    case "close":
      return '<div class="status close"><span>Close</span></div>';
    default:
      break;
  }
};

</script>


<template>
  <div class="">
    <div class="overview flex h-20 p-0 gap-5">
      <div
        class="overview-left bg-gradient-to-r from-[#e7c6ff4d] to-[#c8b6ff66] rounded-lg flex justify-between px-0 py-3"
      >
        <div class="info pl-4">
          <h5 class="text-[#7b5ed5] text-base font-medium tracking-wide">
            Total Task
          </h5>
          <span class="text-xl font-bold text-[#7b5ed5]">
            {{ props.tasks.length }}
          </span>
        </div>
      </div>
      <div class="overview-right flex">
        <div
          class="status close flex-1 bg-gradient-to-r from-blue-300 to-blue-400 p-6 rounded-tl-lg rounded-bl-lg"
        >
          <div class="icon flex items-center pt-2">
            <span class="text-[#0077b6]">Close</span>
          </div>
          <div class="number text-xl font-bold">
            {{ props.countTask?.close ? props.countTask?.close : "-" }}
          </div>
        </div>
        <div
          class="status done flex-1 bg-gradient-to-r from-green-300 to-green-400 p-6"
        >
          <div class="icon flex items-center pt-2">
            <span class="text-[#08715e]">Done</span>
          </div>
          <div class="number text-xl font-bold">
            {{ props.countTask?.done ? props.countTask?.done : "-" }}
          </div>
        </div>
        <div
          class="status inprocess flex-1 bg-gradient-to-r from-pink-300 to-pink-400 p-6"
        >
          <div class="icon flex items-center pt-2">
            <span class="text-[#a33397]">In Process</span>
          </div>
          <div class="number text-xl font-bold">
            {{ props.countTask?.in_progress ? props.countTask?.in_progress : "-" }}
          </div>
        </div>
        <div
          class="status created flex-1 rounded-tr-lg rounded-br-lg bg-gradient-to-r from-orange-300 to-orange-400 p-6"
        >
          <div class="icon flex items-center pt-2">
            <span class="text-[#b06c19]">Created</span>
          </div>
          <div class="number text-xl font-bold">
            {{ props.countTask?.created ? props.countTask?.created : "-" }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-4">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Task name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Level
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="task in props.tasks" :key="task.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ task?.title }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ task?.actions[0]?.description }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs font-semibold"
                      v-html="displayStatus(task?.status)"
                    >
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">1</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ convertDateFirebase(task?.createdAt) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.overview-left {
  flex: 1;
}
.overview-right {
  flex: 3;
}

.status {
  padding: 6px 12px;
}
.close {
  background: linear-gradient(
    to right,
    rgba(0, 150, 199, 0.3),
    rgba(0, 119, 182, 0.4)
  );
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: #0077b6;
}

.done {
  background: linear-gradient(
    to right,
    rgba(44, 198, 170, 0.3),
    rgba(63, 151, 120, 0.4)
  );

  color: #08715e;
}

.inprogcess {
  background: linear-gradient(
    to right,
    rgba(163, 51, 151, 0.3),
    rgba(128, 67, 134, 0.4)
  );
  color: #a33397;
}

.created {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: linear-gradient(
    to right,
    rgba(213, 143, 59, 0.3),
    rgba(196, 171, 117, 0.4)
  );
  color: #b06c19;
}
</style>
