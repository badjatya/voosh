"use client";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import { useFetch } from "@/lib/api";

const Todo = () => {
	const [todo, setTodo] = useState([]);
	const [inProgressTodo, setInProgressTodo] = useState([]);
	const [doneTodo, setDoneTodo] = useState([]);

	useEffect(() => {
		const fetchTodo = async () => {
			const data = await useFetch({
				url: "todo",
				method: "GET",
			});

			if (data.success) {
				console.log(data);
				setTodo(data.data.todo);
				setInProgressTodo(data.data.inProgressTodo);
				setDoneTodo(data.data.doneTodo);
			}
		};
		fetchTodo();
	}, []);

	return (
		<div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
			<div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>Todo</h2>
					<div className='bg-gray-200 rounded-lg p-2 w-full flex flex-col gap-2'>
						{todo.map((item) => (
							<TodoItem key={item._id} {...item} />
						))}
					</div>
				</div>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>In Progress</h2>
					<div className='bg-yellow-100 rounded-lg p-2 w-full flex flex-col gap-2'>
						{inProgressTodo.map((item) => (
							<TodoItem key={item._id} {...item} />
						))}
					</div>
				</div>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>Done</h2>
					<div className='bg-green-200 rounded-lg p-2 w-full flex flex-col gap-2 '>
						{doneTodo.map((item) => (
							<TodoItem key={item._id} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Todo;
