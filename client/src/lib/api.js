import axios from "axios";
import { getCookie } from "@/actions/auth";

// Assuming BE_URL is your backend URL
const BE_URL = "http://localhost:8000/api/v1/";

const axiosInstance = axios.create({
	baseURL: BE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const useFetch = async ({ url, method, body }) => {
	const token = await getCookie("access-token");
	try {
		const { data } = await axiosInstance(`${BE_URL}${url}`, {
			method,
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return error;
	}
};

export { axiosInstance, useFetch };
