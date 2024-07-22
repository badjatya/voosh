"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFetch } from "@/lib/api";
import { revalidatePath } from "next/cache";

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
});

const CreateTodoModal = ({ isOpen, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (values) => {
		console.log(values);
		try {
			const data = await useFetch({
				url: "todo",
				method: "POST",
				body: JSON.stringify(values),
			});

			if (data.success) {
				// TODO: revalidate the cache
				onClose();
			}
		} catch (error) {}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-6 rounded shadow-lg w-full max-w-md mx-4 sm:w-1/2 lg:w-1/3'>
				<h2 className='text-2xl font-bold mb-4'>Add Todo</h2>
				<form>
					<div className='mb-4'>
						<label className='block text-gray-700'>Title</label>
						<Input
							type='text'
							placeholder='Enter title'
							{...register("title")}
							className='mt-1 block w-full p-2 border border-gray-300 rounded'
						/>
						{errors.title && (
							<p className='text-red-500 text-sm mt-2'>
								{errors.title.message}
							</p>
						)}
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>
							Description
						</label>
						<textarea
							{...register("description")}
							placeholder='Enter description'
							className='mt-1 block w-full p-2 border border-gray-300 rounded'
						/>
						{errors.description && (
							<p className='text-red-500 text-sm mt-2'>
								{errors.description.message}
							</p>
						)}
					</div>
					<div className='flex items-center gap-4 justify-end'>
						<Button
							className='cursor-pointer'
							onClick={onClose}
							variant='destructive'>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit(onSubmit)}
							className='cursor-pointer'>
							Create Todo
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTodoModal;
