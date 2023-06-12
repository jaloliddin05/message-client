import { environment } from '../../environment';
const API_URL = environment.apiUrl;
const LOGIN_URL = `${API_URL}/user/login`;
const USER_URL = `${API_URL}/user`;
const MESSAGE_URL = `${API_URL}/message`;

export default { LOGIN_URL, USER_URL, MESSAGE_URL };
