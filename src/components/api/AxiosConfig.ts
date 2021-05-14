import axios from "axios";
const user_token = localStorage.getItem('user_token')
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common =  { Authorization: `Bearer ${user_token}` }
export default axios;