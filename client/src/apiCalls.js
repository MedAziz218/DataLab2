import axios from "axios";
const baseURL = "http://localhost:3001";
const UsersURL = `${baseURL}/api/user`;
const loginURL = `${baseURL}/api/user/login`;
const createUserURL = `${baseURL}/api/user/signup`;
//process.env.REACT_APP_BACK_ADRESS+"/auth/login"

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await sleep(200);
    console.log(loginURL)
    const res = await axios.post(loginURL, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("login success",res.data );

    
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    // console.log(error_message);
    // console.log(err);

    // if (error_message == "wrong_password")
    //   error_message = "Mot de passe incorrect. Veuillez réessayer.";
    // else if (error_message == "bad_request")
    //   error_message =
    //     "Matricule ou mot de passe incorrect. Veuillez réessayer.";
    // else if (error_message == "user_not_found")
    //   error_message =
    //     "Matricule ou mot de passe incorrect. Veuillez réessayer.";
    if (error_message.error) 
     error_message = error_message.error;

    else error_message = "Probleme de Connection";
    dispatch({ type: "LOGIN_FAILURE", payload: error_message });

    return err;
  }
};

export const logoutCall = async (dispatch) => {
  // localStorage.setItem("user", JSON.stringify(null))
  localStorage.clear();
  dispatch && dispatch({ type: "LOGOUT" });
};

export const getUsers = async () => {
  try {
    const res = await axios.get(UsersURL);
    res.data.map((user) => {
      user.password = "";
      user.id = user._id;
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return err;
  }
};
export const updateUsers = async (userCredential) => {
  try {
    if (userCredential.password === "") {
      delete userCredential.password;
    }
    const res = await axios.put(
      UsersURL + "/" + userCredential._id,
      userCredential
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return err;
  }
};
export const deleteUser = async (userID) => {
  try {
    console.log(UsersURL + "/" + userID);
    const res = await axios.delete(UsersURL + "/" + userID);

    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return err;
  }
};

export const createUser = async (userCredential) => {
  try {
    const res = await axios.post(createUserURL, userCredential);
    console.log(res.data);
    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(error_message);

    return err;
  }
};
