import axios from "axios";
const loginURL = "http://localhost:3001/api/auth/login"
//process.env.REACT_APP_BACK_ADRESS+"/auth/login"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await sleep(200)
    
    console.log(userCredential)
    const res = await axios.post(loginURL, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("login succ")
    
  } catch (err) {
    
   
    let error_message = err.response ?  err.response.data  : err.message
    
    console.log(error_message)
    dispatch({ type: "LOGIN_FAILURE", payload: error_message });

    return err
  }
};


export const logoutCall = async ( dispatch) => {
  // localStorage.setItem("user", JSON.stringify(null))
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  
};