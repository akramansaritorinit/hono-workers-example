export const AddTodoForm = () => (
    <form
        hx-post="/todo"
        hx-target="#todo"
        hx-swap="beforebegin"
        _="on htmx:afterRequest reset() me"
        class="mb-4 flex items-center gap-5"
    >
        <input name="name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2" />
        <button class="h-fit text-white bg-blue-700 hover:bg-blue-800 rounded-md px-3 py-2 text-center" type="submit">
            Add
        </button>
    </form>
);

export const Item = ({ id, name, completed }: { id: number; name: string; completed: boolean }) => (
    <div
        id={`item-${id}`}
        class="mt-5 flex items-center justify-between gap-20 border-2 bg-gray-100 px-5 py-2 rounded-md"
    >
        <label htmlFor={`#todo-${id}`} class="flex items-center text-lg font-medium tracking-widest">
            <input
                id={`todo-${id}`}
                hx-put={`/todo/${id}`}
                type="checkbox"
                checked={!!completed}
                class="mr-2 h-6 w-6"
            />
            {name}
        </label>
        <button hx-delete={`/todo/${id}`} hx-swap="outerHTML" hx-target={`#item-${id}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-500 fill-white"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
            </svg>
        </button>
    </div>
);

export const TodosList = ({ todos }: { todos: { id: number; name: string; completed: boolean }[] }) => (
    <div class="flex flex-col">
        {todos.map((todo) => (
            <Item {...todo} />
        ))}
    </div>
);
