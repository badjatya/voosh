"use server";

import { cookies } from "next/headers";

async function createCookie(token, user) {
	const twoDay = 2 * 24 * 60 * 60 * 1000;
	cookies().set("access-token", token, { expires: Date.now() + twoDay });
	cookies().set("user", JSON.stringify(user), {
		expires: Date.now() + twoDay,
	});
}

export default createCookie;
