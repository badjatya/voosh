import TodoItem from "./components/TodoItem";

const Todo = () => {
	return (
		<div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
			<div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>Todo</h2>
					<div className='bg-gray-200 rounded-lg p-2 w-full flex flex-col gap-4'>
						<TodoItem
							title='Temp'
							description='Temp'
							createdAt={new Date()}
						/>
						<TodoItem
							title='Temp'
							description='Temp'
							createdAt='Temp'
						/>
					</div>
				</div>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>In Progress</h2>
					<div className='bg-yellow-100 rounded-lg p-2 w-full flex flex-col gap-4'>
						<TodoItem
							title='Temp'
							description='Temp'
							createdAt='Temp'
						/>
					</div>
				</div>
				<div className='lg:w-[33%]'>
					<h2 className='text-xs mb-1 lg:text-sm'>Done</h2>
					<div className='bg-green-200 rounded-lg p-2 w-full flex flex-col gap-4 '>
						<TodoItem
							title='Temp'
							description='Temp'
							createdAt='Temp'
						/>
						<TodoItem
							title='Temp'
							description='Temp'
							createdAt='Temp'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Todo;
