import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  setDoc,
} from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, timestamp } from "../firebase";

import axiosClient from "../api/axiosClient";
import { setAuth } from "../util/auth";
import { groupByStatus } from "../util/firebaseHelper";

//===============================ListUsers==================================\\
export const getListUsers = async ({ commit }) => {
  console.log("getListUsers");
  commit("callListUsers");

  const q = query(collection(db, "users"));
  onSnapshot(q, (snapShot) => {
    const listUsersInFirebase = snapShot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    // console.log({ listUsersInFirebase });
    // const listUsers = groupByStatus(listUsersInFirebase);
    // console.log({ listUsers });
    commit("setListUsers", listUsersInFirebase);
  });
};

//===============================ListEvent==================================\\
export const getListEvents = async ({ commit }) => {
  console.log("getListEvents");
  commit("callListEvents");

  const q = query(collection(db, "events"));
  onSnapshot(q, (snapShot) => {
    const listEventInFirebase = snapShot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    //   console.log({ listEventInFirebase });
    const listEvents = groupByStatus(listEventInFirebase);
    // console.log({ listEvents });
    commit("setListEvents", listEvents);
  });
};
//===============================CRUD Event==================================\\

export const createEvent = async ({ commit }, params) => {
  const newEventId = uuid();
  const { status } = params;
  const newEvent = {
    id: newEventId,
    is_done: status === "done",
    ...params,
  };
  // console.log({ newEvent });

  const eventsRef = doc(db, "events", newEventId);
  await setDoc(eventsRef, newEvent);
  commit("createEventSuccess");
};

export const updateStatusAnEvent = async ({ commit }, params) => {
  const listRef = doc(db, "events", params.id);
  const newEvent = {
    ...params,
  };
  await updateDoc(listRef, newEvent);
};

export const updateEvent = async ({ commit }, params) => {
  const listRef = doc(db, "events", params.id);

  const newEvent = {
    ...params,
  };
  await updateDoc(listRef, newEvent);
  commit("updateEventSuccess");
};
//===============================Login==================================\\

export const login = async ({ commit }, credentials) => {
  try {
    const response = await axiosClient.post("api/authenticate", credentials);

    if (response?.id_token) {
      setAuth({
        api_token: response?.id_token || "",
      });
      const user_response = await axiosClient.get("api/account");
      commit("loginSuccess");
      commit("getUser", user_response);
    } else {
      commit("loginFailer");
    }
  } catch (error) {
    commit("loginFailer");
    console.error(error);
    alert(error.response.data.message);
  }
};

export const logout = async ({ commit }) => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("me");
    commit("logout");
  } catch (error) {
    console.error(error);
  }
};

export const getAccountUser = async ({ commit }) => {
  try {
    const user_response = await axiosClient.get("api/account");
    if (user_response) {
      localStorage.setItem("me", JSON.stringify(user_response));
      commit("getUser", user_response);
    }
  } catch (error) {
    console.error(error);
  }
};

// write user to firestore when user login for the first time
export const writeUserToFireStore = async ({ commit }, user) => {
  const userDocRef = doc(db, "users", user.id.toString());
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    const newUser = user;
    await setDoc(userDocRef, newUser);
  }
};

export const SearchUser = ({ commit }, users) => {
  commit("searchUser", users);
};
