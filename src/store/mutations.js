export function toggleSideBar(state) {
  state.sideBar.show = !state.sideBar.show;
}

//Users
export function callListUsers(state) {
  // console.log("ye");
  state.listUsers.isLoading = true;
}
export function setListUsers(state, payload) {
  state.listUsers.data = payload;
  state.listUsers.isLoading = false;
  state.listUsers.dataFilter = payload;
}

//Events
export function callListEvents(state) {
  // console.log("ye");
  state.listEvents.isLoading = true;
}
export function setListEvents(state, payload) {
  state.listEvents.data = payload;
  state.listEvents.isLoading = false;
}

export function setEventDetail(state, payload) {
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
export function openModalDetailEvent(state) {
  state.popup.showModalDetailEvent = true;
}
export function closeModalDetailEvent(state) {
  state.popup.showModalDetailEvent = false;
}

//Login
export function login(state) {
  state.login.isLoading = true;
}

export function loginSuccess(state, payload) {
  state.login.isLoading = false;
  state.login.isLogged = true;
}

export function loginFailer(state, payload) {
  state.login.isLoading = false;
  state.login.isLogged = false;
}

// logout
export function logout(state) {
  state.login.isLoading = false;
  state.login.isLogged = false;
  state.user.data = null;
}

export function getUser(state, payload) {
  state.user.data = payload;
}

export function searchUser(state, payload) {
  state.listUsers.data = payload;
}
