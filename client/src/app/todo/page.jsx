"use client";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import { useFetch } from "@/lib/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

	const onDragEnd = async (result) => {
		console.log("Result: ", result);
		const { source, destination } = result;

		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add;
		let aTodo = todo;
		let aInProgressTodo = inProgressTodo;
		let aDoneTodo = doneTodo;

		// Removing todo from source
		if (source.droppableId === "todo") {
			add = aTodo[source.index];
			aTodo.splice(source.index, 1);
		} else if (source.droppableId === "inProgressTodo") {
			add = aInProgressTodo[source.index];
			aInProgressTodo.splice(source.index, 1);
		} else {
			add = aDoneTodo[source.index];
			aDoneTodo.splice(source.index, 1);
		}

		// Adding todo to destination
		if (destination.droppableId === "todo") {
			aTodo.splice(destination.index, 0, add);
		} else if (destination.droppableId === "inProgressTodo") {
			aInProgressTodo.splice(destination.index, 0, add);
		} else {
			aDoneTodo.splice(destination.index, 0, add);
		}

		setTodo([...aTodo]);
		setInProgressTodo([...aInProgressTodo]);
		setDoneTodo([...aDoneTodo]);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
				<div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
					<div className='lg:w-[33%]'>
						<h2 className='text-xs mb-1 lg:text-sm'>Todo</h2>
						<Droppable droppableId='todo'>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='bg-gray-200 rounded-lg p-2 w-full flex flex-col gap-2'>
									{todo.map((item, index) => (
										<TodoItem
											key={item._id}
											index={index}
											{...item}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div className='lg:w-[33%]'>
						<h2 className='text-xs mb-1 lg:text-sm'>In Progress</h2>
						<Droppable droppableId='inProgressTodo'>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='bg-yellow-100 rounded-lg p-2 w-full flex flex-col gap-2'>
									{inProgressTodo.map((item, index) => (
										<TodoItem
											index={index}
											key={item._id}
											{...item}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div className='lg:w-[33%]'>
						<h2 className='text-xs mb-1 lg:text-sm'>Done</h2>
						<Droppable droppableId='doneTodo'>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='bg-green-200 rounded-lg p-2 w-full flex flex-col gap-2 '>
									{doneTodo.map((item, index) => (
										<TodoItem
											index={index}
											key={item._id}
											{...item}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			</div>
		</DragDropContext>
	);
};

export default Todo;
