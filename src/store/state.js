const state = {
  sideBar: {
    show: true,
  },
  user: [],
  listUsers: {
    isLoading: false,
    data: [],
  },
  eventDetail: {},
  listEvents: {
    isLoading: false,
    data: [],
  },
  popup: {
    showModalCreateEvent: false,
    showModalUpdateEvent: false,
    showModalDetailEvent: false,
  },
};
export default state;
