export function toggleSideBar(state) {
  state.sideBar.show = !state.sideBar.show;
}

//listEvents
export function callListEvents(state) {
  console.log("ye");
  state.listEvents.isLoading = true;
}
export function setListEvents(state, payload) {
  state.listEvents.data = payload;
  state.listEvents.isLoading = false;
}
