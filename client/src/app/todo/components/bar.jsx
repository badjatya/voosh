"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateTodoModal from "./createTodoModal";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSearch } from "../context";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Bar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const path = usePathname();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const { searchValue, setSearchValue, sortOption, setSortOption } =
		useSearch();
	return (
		<div className='flex items-center justify-between rounded-lg gap-4'>
			<Input
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder='Search Todo'
			/>
			<Select onValueChange={(value) => setSortOption(value)}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Sort By' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='order'>Order</SelectItem>
					<SelectItem value='title'>Title</SelectItem>
					<SelectItem value='createdAt'>Created At</SelectItem>
					<SelectItem value='updatedAt'>Updated At</SelectItem>
				</SelectContent>
			</Select>

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
