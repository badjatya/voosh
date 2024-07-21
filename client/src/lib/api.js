import axios from "axios";

// Assuming BE_URL is your backend URL
const BE_URL = process.env.BE_URL;

const axiosInstance = axios.create({
	baseURL: BE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
