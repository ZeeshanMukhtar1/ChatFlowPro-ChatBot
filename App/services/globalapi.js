import axios from 'axios';

// Update this with your Vercel deployment URL
const BASE_URL = 'https://nextjsbanckend.vercel.app/api/bardapi';

const getBardApi = (userMsg) => axios.get(`${BASE_URL}?ques=${userMsg}`);

export default {
  getBardApi,
};
