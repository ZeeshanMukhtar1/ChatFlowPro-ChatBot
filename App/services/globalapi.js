import axios from 'axios';

const Base_URL = 'http://192.168.10.5:3000/api/bardapi';

const getbardapi = (usermsg) => axios.get(Base_URL + '?ques=' + usermsg);

export default getbardapi;
