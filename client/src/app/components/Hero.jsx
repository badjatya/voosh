"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
	return (
		<div className='min-h-[70vh] flex items-center justify-center'>
			<section className='mb-8 flex flex-col justify-between gap-6 sm:gap-10 md:mb-16 md:gap-16 lg:flex-row'>
				{/* <!-- content - start --> */}
				<div className='flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12'>
					<p className='mb-4 font-semibold text-primary md:mb-6 md:text-lg xl:text-xl'>
						Organize your tasks
					</p>

					<h1 className='mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl'>
						Best place to manage your todos
					</h1>

					<div className='flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start'>
						<Button asChild>
							<Link href='/sign-up'>Join Now to create Todo</Link>
						</Button>
					</div>
				</div>
				{/* <!-- content - end --> */}

				{/* <!-- image - start --> */}
				<div className='relative h-64 lg:h-[380px] lg:w-[650px]'>
					<Image src='/home/main.svg' fill alt='Illustration' />
				</div>
				{/* <!-- image - end --> */}
			</section>
		</div>
	);
};

export default Hero;
