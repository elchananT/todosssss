import type {ChangeEvent} from "react";
import AddTodoButton from "./AddTodoButton.tsx";
import {useSearchStore, useUserStore} from "../store.ts";
import LoginButton from "./LoginButton.tsx";

const Navigation = () => {
    const { searchTerm, setSearchTerm} = useSearchStore();
    const { user } = useUserStore();

    return (
            <div className="w-[95%] flex justify-between items-center px-2 md:px-14 xl:w-4/5">
            <input
                value={searchTerm}
                name={searchTerm}
                placeholder="Search Todo..."
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="px-4 py-2 md:text-xl md:px-8 md:py-4 border-2 border-gray-300 rounded-2xl max-sm:w-[70%] md:w-1/2"
            />

            {user ? <AddTodoButton mediaQuery="max-sm:hidden "/> : <LoginButton mediaQuery="max-sm:rounded-lg flex justify-center" textQuery="max-sm:text-[10px]" icon={false}/>}

        </div>
    )
}
export default Navigation
