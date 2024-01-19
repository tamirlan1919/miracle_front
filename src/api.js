import axios from "axios";

const userString = localStorage.getItem('user');

// Check if userString is not null or undefined
const user = userString ? JSON.parse(userString) : null;

console.log(user);

const instance = axios.create({
  baseURL: "https://justadmin.ru/api",
  headers: {
    Authorization: user ? `Bearer ${user.jwt}` : null, // Check if user is not null
  },
});

export default instance;
