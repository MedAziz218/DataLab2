import { instance as axios } from "./axiosInstance";
const baseURL = "";
const UsersURL = `${baseURL}/api/user`;
const loginURL = `${baseURL}/api/user/login`;
const createUserURL = `${baseURL}/api/user/signup`;
const checkIsUserURL = `${baseURL}/api/user/isUser`;
const checkIsAdminURL = `${baseURL}/api/user/isAdmin`;


//process.env.REACT_APP_BACK_ADRESS+"/auth/login"

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await sleep(200);
    console.log(loginURL);
    const res = await axios.post(loginURL, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("login success", res.data);
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log("error", err);

    if (error_message.error) error_message = error_message.error;
    else error_message = "Probleme de Connection";
    dispatch({ type: "LOGIN_FAILURE", payload: error_message });

    return error_message;
  }
};

export const logoutCall = async (dispatch) => {
  // localStorage.setItem("user", JSON.stringify(null))
  localStorage.clear();
  dispatch && dispatch({ type: "LOGOUT" });
};

export const getUsers = async () => {
  try {
    console.log("getting")
    const res = await axios.get(UsersURL);
    res.data.map((user) => {
      user.password = "";
      user.id = user._id;
    });

    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(err)
    if (error_message.error) error_message = error_message.error;
    else error_message = "Probleme de Connection";

    return error_message;
  }
};
export const updateUsers = async (userId, userCredential) => {
  try {
    if (userCredential.password === "") {
      delete userCredential.password;
    }
    const res = await axios.put(UsersURL + "/" + userId, userCredential);

    console.log("UPDATE:", res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    if (error_message.error) error_message = error_message.error;
    else error_message = "Probleme de Connection";

    return error_message;
  }
};
export const deleteUser = async (userID) => {
  try {
    console.log(UsersURL + "/" + userID);
    const res = await axios.delete(UsersURL + "/" + userID);

    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    if (error_message.error) error_message = error_message.error;
    else error_message = "Probleme de Connection";

    return error_message;
  }
};

export const createUser = async (userCredential) => {
  try {
    const res = await axios.post(createUserURL, userCredential);
    console.log("CREATE:", res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return error_message;
  }
};

export const checkIsUser = async () => {
  try {
    const res = await axios.get(checkIsUserURL);
    console.log("Check User:", res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return error_message;
  }
};

export const checkIsAdmin = async () => {
  try {
    const res = await axios.get(checkIsAdminURL);
    console.log("Check Admin:", res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return error_message;
  }
};
