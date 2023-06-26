<template>
  <div class="">
    <div class="relative h-56">
      <div
        class="h-32 rounded-xl bg-gradient-to-r from-[#02002473] via-[#22355EA6] to-[#256673d9]"
      ></div>
      <div class="absolute top-24 left-5 flex items-center">
        <img
          src="../assets/default.png"
          alt="Avatar"
          class="rounded-full w-28 h-28"
        />
        <div class="ml-4 mt-6">
          <h2 class="text-xl font-bold">
            {{ user[0]?.lastName }} {{ user[0]?.firstName }}
          </h2>
          <p class="text-sm text-gray-600">{{ user[0]?.email }}</p>
        </div>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="flex-1">
        <div class="border-b-2">
          <div class="flex">
            <!-- class="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold border-b-2 border-gray-200 rounded-tl-md" -->
            <button
              :class="
                tabActive === 'events'
                  ? 'py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold border-b-2 border-gray-200 rounded-tl-md'
                  : 'py-2 px-4 bg-white hover:bg-gray-100 text-gray-700 font-semibold rounded-tr-md'
              "
              @click="changeTabActive('events')"
            >
              Events
            </button>
            <button
              :class="
                tabActive !== 'events'
                  ? 'py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold border-b-2 border-gray-200 rounded-tl-md'
                  : 'py-2 px-4 bg-white hover:bg-gray-100 text-gray-700 font-semibold rounded-tr-md'
              "
              @click="changeTabActive('events_archive')"
            >
              EventsArchive
            </button>
          </div>
        </div>

        <div class="pt-4" v-if="tabActive === 'events'">
          <Events :tasks="resultData" :countTask="countTask" />
        </div>

        <div class="pt-4" v-if="tabActive === 'events_archive'">
          <EventsArchive
            :taskArchiveds="eventsArchived"
            :countTask="countTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db } from "../firebase";
import router from "../router";
import Events from "../components/UserDetail/Events.vue";
import EventsArchive from "../components/UserDetail/EventsArchive.vue";

const user = ref([]);

const resultData = ref([]);

const eventsArchived = ref([]);

const countTask = ref([]);

const tabActive = ref("events");

const changeTabActive = (name_tab) => {
  tabActive.value = name_tab;
};

const fetchUser = async (userId) => {
  try {
    const userData = [];
    const eventsData = [];

    // users table
    const docRef = doc(db, "users", router.currentRoute.value.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const _user = docSnap.data();
      userData.push({ id: docSnap.id, ..._user });
    }

    // events table
    const eventsCollection = collection(db, "events");
    const querySnapshot = await getDocs(eventsCollection);
    querySnapshot.forEach((doc) => {
      eventsData.push({ id: doc.id, ...doc.data() });
    });

    const result = eventsData.filter(
      (item) =>
        item.assign.email === userData[0].email &&
        item.assign.id === userData[0].id
    );

    result.sort((a, b) => {
      if (a?.createdAt?.seconds) {
        const dateA = new Date(
          a?.createdAt?.seconds * 1000 + a?.createdAt?.nanoseconds / 1000000
        );

        const dateB = new Date(
          b?.createdAt?.seconds * 1000 + b?.createdAt?.nanoseconds / 1000000
        );
        return dateB?.getTime() - dateA?.getTime();
      }
      return a;
    });

    const _eventsArchived = eventsData.filter(
      (item) =>
        item.status === "close" &&
        item.assign.email == userData[0].email &&
        item.assign.id === userData[0].id
    );

    user.value = userData;
    resultData.value = result;
    eventsArchived.value = _eventsArchived;

    CountTask(result);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const CountTask = (tasks) => {
  const count = {};
  tasks.forEach((item) => {
    if (count[item.status]) {
      count[item.status] += 1;
    } else {
      count[item.status] = 1;
    }
  });
  countTask.value = count;
};

onMounted(async () => {
  await fetchUser();
});

</script>
