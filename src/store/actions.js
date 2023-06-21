import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db, timestamp } from "../firebase";
import { groupByStatus } from "../util/firebaseHelper";

//===============================ListEvent==================================\\
export const getListEvents = async ({ commit }) => {
  console.log("yolo");
  commit("callListEvents");

  const q = query(collection(db, "events"));
  onSnapshot(q, (snapShot) => {
    const listEventInFirebase = snapShot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    //   console.log({ listEventInFirebase });
    const listEvents = groupByStatus(listEventInFirebase);
    console.log({ listEvents });
    commit("setListEvents", listEvents);
  });
};

export const updateListEvents = async ({ commit }, params) => {
  console.log("update list Event", params);

  const listRef = doc(db, "events", params.id);
  const newEvent = {
    ...params,
  };
  await updateDoc(listRef, newEvent);
};
