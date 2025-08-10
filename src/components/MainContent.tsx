import {
  useTodos,
  useSharedTodos,
  useFilterStore,
  useSearchStore,
  useUserStore,
} from "../store";
import { motion } from "motion/react";
import AddTodoButton from "./AddTodoButton.tsx";
import LoginButton from "./LoginButton.tsx";
import ListTodos from "./ListTodos.tsx";
import type { SharedTodo, Todo } from "../types.ts";

const MainContent = () => {
  const user = useUserStore((state) => state.user);
  const filterType = useFilterStore((state) => state.filterType);
  const searchTerm = useSearchStore((state) => state.searchTerm.toLowerCase());
  const todos = useTodos((state) => state.todos);

  if (!user || useTodos.getState().getTodosByUserId(user.id)?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full md:w-4/5 mt-12">
        <div className="bg-gray-300 w-11/12 sm:w-[30rem] h-[16rem] rounded-2xl overflow-hidden flex flex-col items-center gap-4 p-4">
          {[...Array.from({ length: 30 })].map((_, index) => (
            <motion.div
              key={index}
              className="bg-white w-11/12 p-4 rounded-2xl flex justify-between items-center shadow-xl"
              animate={{ y: -200 }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "mirror",
                delay: index * 0.2,
                ease: "linear",
              }}
            >
              <div className="h-[3rem] w-[3rem] bg-gray-400 rounded-lg" />
              <div className="w-[84%] flex flex-col gap-1">
                <div className="w-full bg-gray-300 h-3 rounded-2xl" />
                <div className="w-full bg-gray-400 h-3 rounded-2xl" />
                <div className="w-full bg-gray-500 h-3 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-11/12 backdrop-blur-xs fixed rounded-2xl flex justify-center items-center h-[16rem] sm:w-[30rem]">
          {user ? (
            <AddTodoButton />
          ) : (
            <LoginButton
              icon={true}
              textQuery="max-sm:text-sm"
              mediaQuery="max-md:w-26 rounded-lg"
            />
          )}
        </div>
      </div>
    );
  }

  let filteredTodos: (Todo | SharedTodo)[] = [];

  switch (filterType) {
    case "day":
      filteredTodos = useTodos.getState().getTodosInADay(user.id) || [];
      break;
    case "month":
      filteredTodos = useTodos.getState().getTodosInAMonth(user.id) || [];
      break;
    case "year":
      filteredTodos = useTodos.getState().getTodosInAYear(user.id) || [];
      break;
    case "shared todos":
      filteredTodos =
        useSharedTodos.getState().getSharedTodosByUserId(user.id) || [];
      break;
    case "all":
    default:
      filteredTodos = todos.filter((t) => t.userId === user.id);
      break;
  }

  filteredTodos = filteredTodos.filter((todo) => {
    const title = todo.title.toLowerCase();
    const description = todo.description.toLowerCase();
    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  return (
    <div className="flex max-sm:justify-center h-full xl:w-4/5 p-6 w-screen">
      {filteredTodos.length === 0 ? (
        <p className="text-xl">No todos found.</p>
      ) : (
        <ListTodos filteredTodos={filteredTodos} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default MainContent;
