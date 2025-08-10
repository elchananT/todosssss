import {AnimatePresence} from "framer-motion";
import {motion} from "motion/react";
import {useState} from "react";
import {BsFileEarmarkCheck, BsFileEarmarkCheckFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { LiaTrashAltSolid } from "react-icons/lia";
import {useTodos, useUIStore} from "../store.ts";
import type {TodoCardProps} from "../types.ts";

const TodoCard = ({todo}: TodoCardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { deleteTodoById, updateTodoById } = useTodos()
    const { setShowUpdateTodoForm } = useUIStore()

    return (
        <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.99}}
            transition={{ duration: 0.3 }}
            key={todo.id}
            className="ml-3 @xs:ml-0x mb-2 pb-2 bg-gray-100 px-4 py-2 rounded-lg md:ml-10 w-full cursor-pointer border border-gray-200"
        >
            <div className="flex gap-2 justify-between">
                <h3
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-900 text-3xl sm:text-2xl font-semibold flex justify-between items-center w-11/12
                truncate max-w-xs">
                    {todo.title}
                </h3>
                <span className="flex items-center gap-2">
                        <button
                            onClick={() => updateTodoById(todo.userId, todo.id, {...todo, isDone: !todo.isDone})}
                            className="text-blue-950"
                        >
                            {todo.isDone ? <BsFileEarmarkCheckFill  size={26} /> : <BsFileEarmarkCheck  size={26} />}
                        </button>
                        <button
                            onClick={() => setShowUpdateTodoForm(true)}
                            className="p-1 bg-green-400 rounded-lg text-white">
                            <IoCreateOutline size={26}/>
                        </button>
                        <button
                            onClick={() => deleteTodoById(todo.userId, todo.id)}
                            className="p-1 bg-red-400 rounded-lg text-white">
                            <LiaTrashAltSolid size={26}/>
                        </button>
                    </span>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-4 w-full"
                    >
                        <p className="max-sm:text-lg text-[18px] text-wrap w-full mb-2 text-gray-700">{todo.description}</p>
                        <p className="text-sm text-gray-500">
                            Due: {new Date(todo.dateEnd).toLocaleDateString()} | Done:{" "}
                            {todo.isDone ? "Yes" : "No"}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
export default TodoCard
