"use client";

import { Button } from "@/components/ui/button";

const TodoItem = ({ title, description, createdAt }) => {
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const onView = () => {};
	const onEdit = () => {};
	const onDelete = () => {};

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
		</div>
	);
};

export default TodoItem;
