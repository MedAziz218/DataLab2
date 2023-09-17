import axios from 'axios';

// const backendURL = process.env.REACT_APP_BACKEND_URL; 
const backendURL = window.config.backendURL;
console.log(backendURL)
const instance = axios.create({
  baseURL: backendURL, // Set your API base URL here
  headers: {
    'Content-Type': 'application/json',
    // Other default headers can go here
  },
});

// Add a request interceptor to attach the token to each request
instance.interceptors.request.use(
  config => {
  
    const user = JSON.parse(localStorage.getItem('user'))||null; // Replace with your storage mechanism
    const token = user?user.token: null
   
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// Add a response interceptor to handle authentication errors
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Log out the user when authentication error (401) occurs
      // You can replace this with your own logout logic
      localStorage.clear(); // Remove user data from storage
      window.location.href = '/errors/401'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export { instance};
