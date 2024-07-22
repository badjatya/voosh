"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateTodoModal from "./createTodoModal";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Bar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const path = usePathname();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<div className='flex items-center justify-between rounded-lg gap-4'>
			<Input placeholder='Search Todo' />
			<div>
				{path === "/todo" ? (
					<Button onClick={openModal}>Create Todo</Button>
				) : (
					<Button asChild>
						<Link href='/todo'>Dashboard</Link>
					</Button>
				)}
			</div>

			<CreateTodoModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default Bar;
