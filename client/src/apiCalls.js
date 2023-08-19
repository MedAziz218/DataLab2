import axios from "axios";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await sleep(200)
   
    const res = await axios.post(process.env.REACT_APP_BACK_ADRESS+"/auth/login", userCredential);
  
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    
  } catch (err) {
   
    let error_message = err.response ?  err.response.data.error  : err.message
    

    dispatch({ type: "LOGIN_FAILURE", payload: error_message });

    return err
  }
};


export const logoutCall = async ( dispatch) => {
  // localStorage.setItem("user", JSON.stringify(null))
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  
};