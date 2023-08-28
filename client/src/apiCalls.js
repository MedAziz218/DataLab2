import { instance as axios } from "./axiosInstance";

const UsersURL = "/api/user";
const loginURL = "/api/user/login";
const createUserURL = "/api/user/signup";
const checkIsUserURL = "/api/user/isUser";
const checkIsAdminURL = "/api/user/isAdmin";
//process.env.REACT_APP_BACK_ADRESS+"/auth/login"

export function sleep(ms) {
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
    console.log("getting");
    const res = await axios.get(UsersURL);
    res.data.map((user) => {
      user.password = "";
      user.id = user._id;
    });

    return res.data;
  } catch (err) {
    let error_message = err.response ? err.response.data : err.message;
    console.log(err);
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

// ----------------------------------------------------------------------
// Validation api

export const parseTables = async (
  selectedDate,
  selectedPoste,
  selectedTaille,
  selectedLigne
) => {
  //page 1
  const table1 = JSON.parse(localStorage.getItem("table1")) || null;
  const table2 = JSON.parse(localStorage.getItem("table2")) || null;

  // page 2
  let table3;
  const table30 = JSON.parse(localStorage.getItem("table3-0")) || null;
  const table31 = JSON.parse(localStorage.getItem("table3-1")) || null;
  const table32 = JSON.parse(localStorage.getItem("table3-2")) || null;
  const table33 = JSON.parse(localStorage.getItem("table3-3")) || null;

  const table4 = JSON.parse(localStorage.getItem("table4")) || null;
  const table5 = JSON.parse(localStorage.getItem("table5")) || null;
  const observation = JSON.parse(localStorage.getItem("observation")) || null;
  const notes = JSON.parse(localStorage.getItem("notes")) || null;

  const valid =
    table1 &&
    table2 &&
    table30 &&
    table31 &&
    table32 &&
    table32 &&
    table33 &&
    table4 &&
    table5;

  if (!valid) {
    console.log("please open every page at least once");
    return false;
  }

  //TODO: Vrify data and poste availabel ( check backend )

  // table3Parser

  table3 = {
    heures: [
      ...table30.heures,
      ...table31.heures,
      ...table32.heures,
      ...table33.heures,
    ],
    values: [
      ...table30.values,
      ...table31.values,
      ...table32.values,
      ...table33.values,
    ],
  };

  // sendinggggggg ---------------------

  // schema1 send >>>>>>>
  const schema1 = {
    date: selectedDate,
    poste: selectedPoste,
    heures: table1.heures,
    values: table1.values,
  };

  console.log(">>> schema1");
  console.log(JSON.stringify(schema1));
  const res11 = await sendPage1Schema1(schema1);
  console.log(res11);

  // schema1 send >>>>>>>
  const schema2 = {
    date: selectedDate,
    poste: selectedPoste,
    heures: table2.heures,
    values: table2.values,
  };

  console.log(">>> schema2");
  console.log(JSON.stringify(schema2));
  const res12 = await sendPage1Schema2(schema2);
  console.log(res12);

  // schema3 send >>>>>>>
  const schema3 = {
    date: selectedDate,
    poste: selectedPoste,
    heures: table3.heures,
    values: table3.values,
  };
  // form send >>>>>>>
  const form = {
    date: selectedDate,
    poste: selectedPoste,
    taille: selectedTaille,
    ligne: selectedLigne,
  };
  console.log(">>> Formulaire");
  console.log(JSON.stringify(form));
  const res5 = await sendPage5Form(form);
  console.log(res5);
};

const page1schema1URL = "/api/page1/schema1";
const sendPage1Schema1 = async (body) => {
  try {
    await axios.post(page1schema1URL, body);
    return true;
  } catch (err) {
    return false;
  }
};

const page1schema2URL = "/api/page1/schema2";
const sendPage1Schema2 = async (body) => {
  try {
    await axios.post(page1schema2URL, body);
    return true;
  } catch (err) {
    return false;
  }
};
const page5FormURL = "/api/page5/form";
const sendPage5Form = async (body) => {
  try {
    await axios.post(page5FormURL, body);
    return true;
  } catch (err) {
    return false;
  }
};
