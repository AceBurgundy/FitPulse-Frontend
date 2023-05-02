import axios from 'axios';

const api = axios.create({
  baseURL: "https://aceburgundy.pythonanywhere.com/"
});

export default api;
