const AUTH_LOCAL_STORAGE_KEY = "access_token";

const getAuth = (key = "access_token") => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem(key);

  if (!lsValue) {
    return;
  }

  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const getCurentUser = () => {
  const curentUser = localStorage.getItem("me");
  if (!curentUser) {
    return;
  }
  const curentUserData = JSON.parse(curentUser);
  return curentUserData;
};

const getSessionStorage = (key) => {
  if (!sessionStorage) {
    return;
  }

  const lsValue = sessionStorage.getItem(key);

  if (!lsValue) {
    return;
  }

  try {
    const auth = JSON.parse(lsValue);

    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("AUTH SESSION STORAGE PARSE ERROR", error);
  }
};

const removeSessionStorage = (key) => {
  if (!sessionStorage) {
    return;
  }

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("AUTH SESSION STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

const logout = () => {
  if (window.location.pathname !== "/login") {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    // history.replace("/auth");
  }
};

export {
  getAuth,
  setAuth,
  removeAuth,
  logout,
  getSessionStorage,
  removeSessionStorage,
  getCurentUser,
};
