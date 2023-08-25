import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { checkIsAdmin,checkIsUser,logoutCall } from "apiCalls";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  // token:"",
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (!state.user) {
      if (localStorage.length) localStorage.clear();
      return;
    }
    if (!state.user.token) {
      logoutCall(dispatch)
      window.location = "/errors/401"
      return;
    }
 
    const auth =  state.user.isAdmin ? checkIsAdmin() :checkIsUser()
    auth.then((res)=>{
      if (!res.success){
      logoutCall(dispatch)
      window.location = "/errors/401"

      }
    })
    
  }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
