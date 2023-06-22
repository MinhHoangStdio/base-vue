export function toggleSideBar(state) {
  state.sideBar.show = !state.sideBar.show;
}

//Users
export function callListUsers(state) {
  // console.log("ye");
  state.listUsers.isLoading = true;
}
export function setListUsers(state, payload) {
  // console.log("user", payload);
  state.listUsers.data = payload;
  state.listUsers.isLoading = false;
}

//Events
export function callListEvents(state) {
  // console.log("ye");
  state.listEvents.isLoading = true;
}
export function setListEvents(state, payload) {
  // console.log("event", payload);
  state.listEvents.data = payload;
  state.listEvents.isLoading = false;
}

export function setEventDetail(state, payload) {
  // console.log("eventDetail", payload);
  state.eventDetail = payload;
}

export function createEventSuccess(state) {
  state.popup.showModalCreateEvent = false;
}

export function updateEventSuccess(state) {
  state.popup.showModalUpdateEvent = false;
}

//Modals
export function openModalCreateEvent(state) {
  state.popup.showModalCreateEvent = true;
}
export function closeModalCreateEvent(state) {
  state.popup.showModalCreateEvent = false;
}
export function openModalUpdateEvent(state) {
  state.popup.showModalUpdateEvent = true;
}
export function closeModalUpdateEvent(state) {
  state.popup.showModalUpdateEvent = false;
}
