import { getAuth, getCurentUser } from "../util/auth";

const api_token = getAuth()?.api_token;
const currentUser = getCurentUser();

const state = {
  sideBar: {
    show: true,
  },
  eventDetail: {},
  login: {
    isLoading: false,
    isLogged: api_token ? true : false,
  },
  user: {
    data: currentUser || null,
  },
  listEvents: {
    isLoading: false,
    data: [],
  },
  popup: {
    showModalCreateEvent: false,
    showModalUpdateEvent: false,
    showModalDetailEvent: false,
  },
  listUsers: {
    isLoading: false,
    data: [],
    dataFilter: []
  },
};
export default state;
