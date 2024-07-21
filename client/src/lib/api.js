import axios from "axios";

// Assuming BE_URL is your backend URL
const BE_URL = "http://localhost:8000/api/v1/";

const axiosInstance = axios.create({
	baseURL: BE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
