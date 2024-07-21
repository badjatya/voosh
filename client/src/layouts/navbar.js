import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

const Navbar = () => {
	const cookieStore = cookies();
	const token = cookieStore.get("access-token");
	console.log(token);
	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
				<header className='mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16'>
					<Link
						href='/'
						className='inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl'
						aria-label='logo'>
						Todo
					</Link>
					{token ? (
						<div className='flex gap-4 items-center'>
							<Button asChild>
								<Link href='/todo'>Todo</Link>
							</Button>
							<Button variant='outline'>Logout</Button>
						</div>
					) : (
						<div className='flex gap-4 items-center'>
							<Button asChild>
								<Link href='/login'>Login</Link>
							</Button>
							<Button variant='outline' asChild>
								<Link href='/sign-up'>Signup</Link>
							</Button>
						</div>
					)}
				</header>
			</div>
		</div>
	);
};

export default Navbar;
