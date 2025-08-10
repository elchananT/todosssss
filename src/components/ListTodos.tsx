import TodoCard from "./TodoCard.tsx";
import {chunkArray} from "../utils.ts";
import type {SharedTodo, Todo} from "../types.ts";
import {useUIStore} from "../store.ts";
import UpdateTodoForm from "./UpdateTodoForm.tsx";

const ListTodos = ({ filteredTodos, searchTerm }: { filteredTodos: Todo[]; searchTerm: string;}) => {
    const { showUpdateTodoForm } = useUIStore()

    if (!filteredTodos) return;

    if (searchTerm.trim() !== "") {
        return (
            <ul className="flex flex-col max-md:justify-center gap-3 w-full max-w-md mx-auto">
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <TodoCard todo={todo} />
                    </li>
                ))}
            </ul>
        );
    }

    const chunkedTodos = chunkArray<Todo | SharedTodo>(filteredTodos, 9);
    const columns = [0, 1, 2].map((i) => chunkedTodos[i] || []);

    return (
        <div className="w-screen max-xl:justify-center sm:flex gap-6 xl:w-full mx-auto">
            {columns.map((todosChunk, idx) => (
                <div key={idx} className="flex flex-col gap-3 w-[95%] md:w-[300px]">
                    {todosChunk.map((todo) => (
                        <div key={todo.id}>
                            <TodoCard todo={todo} />
                            {showUpdateTodoForm  && <UpdateTodoForm todo={todo}/>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ListTodos