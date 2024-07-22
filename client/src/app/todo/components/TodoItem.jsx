"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateTodoModal from "./createTodoModal";
import { useFetch } from "@/lib/api";

const TodoItem = ({ title, description, createdAt, _id, order }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const onView = () => {};
	const onEdit = () => {
		openModal();
	};
	const onDelete = async () => {
		try {
			const data = await useFetch({
				url: `todo/${_id}`,
				method: "DELETE",
			});

			if (data.success) {
				console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className='bg-white shadow-md rounded-lg p-4 cursor-pointer'>
			<div className='flex flex-col justify-between items-start '>
				<div>
					<h3 className='text-lg font-bold text-gray-800'>{title}</h3>
					<p className='text-sm text-gray-600 mt-1'>{description}</p>
					<p className='text-xs text-gray-400 mt-2'>
						{formatDate(createdAt)}
					</p>
				</div>
				<div className='flex mt-4 space-x-4'>
					<Button onClick={onView}>View</Button>
					<Button variant='secondary' onClick={onEdit}>
						Edit
					</Button>
					<Button onClick={onDelete} variant='destructive'>
						Delete
					</Button>
				</div>
			</div>
			<CreateTodoModal
				isOpen={isModalOpen}
				onClose={closeModal}
				id={_id}
				title={title}
				description={description}
				order={order}
			/>
		</div>
	);
};

export default TodoItem;
