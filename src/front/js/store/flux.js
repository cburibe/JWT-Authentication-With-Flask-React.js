const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      base_url:
        "https://3001-4geeksacade-reactflaskh-v9i7t9wdap3.ws-us47.gitpod.io",
      userAll: [],
    },
    actions: {
      register: async (email, password) => {
        const store = getStore();
        let opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        fetch(`${store.base_url}/api/register`, opt)
          .then((response) => {
            return response.json();
          })
          .catch((error) => console.error(error));
      },
      getAllUserInfo: async () => {
        let store = getStore();
        let access_token = localStorage.getItem("access_token");
        let opt = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        try {
          const response = await fetch(`${store.base_url}/api/users`, opt);
          if (response.status !== 200)
            throw new Error(response.status, "error");
          const data = await response.json();
          setStore({
            userAll: { ...data },
          });
        } catch (error) {
          console.error(error);
        }
      },
      login: async (email, password) => {
        let store = getStore();
        let opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        let response = await fetch(`${store.base_url}/api/login`, opt);
        if (response.status !== 200) throw new Error(response.message);
        let data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        return data;
      },
      logout: () => {
        localStorage.removeItem("access_token");
      },
    },
  };
};

export default getState;
