"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/api";

const LogoutButton = () => {
	const router = useRouter();

	const logout = async () => {
		try {
			const { data } = await axiosInstance.get("/auth/logout");

			if (data.success) {
				deleteCookie();
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Button onClick={logout} variant='outline'>
			Logout
		</Button>
	);
};

export default LogoutButton;
