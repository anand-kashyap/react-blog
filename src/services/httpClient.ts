import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export { axios as httpClient };
