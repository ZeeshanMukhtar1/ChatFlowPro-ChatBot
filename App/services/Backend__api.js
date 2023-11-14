// Import axios for making HTTP requests
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://nextjsbanckend.vercel.app/api/bardapi';

// Function to get data from the Bard API based on user input
const getBardApi = (userMsg) => axios.get(`${BASE_URL}?ques=${userMsg}`);

// Export the function for use in other components or services
export default {
  getBardApi,
};
