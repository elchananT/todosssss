import {capitalizeWords} from "../utils.ts";
import type {FilterType} from "../types.ts";
import {useFilterStore, useUIStore} from "../store.ts";
import { CiUser } from "react-icons/ci";
import { motion } from "motion/react";
import {FaArrowLeft, FaArrowRight } from "react-icons/fa";
import UserInfo from "./UserInfo.tsx";

const filters: FilterType[] = ["day", "month", "year", "shared todos"];

const Sidebar = () => {
    const { filterType, setFilterType } = useFilterStore();
    const {  showUser, setShowUser, showSidebar, setShowSidebar } = useUIStore();

    return (
        <div>
            <button
                onClick={() => setShowSidebar(true)}
                    className={` mt-8 ml-14 text-blue-950 inline ${showSidebar ? " max-xl:hidden" : ""}`}>
                <FaArrowRight size={24}/>
            </button>
            <div className={`fixed z-20 bg-black/30 left-0 top-0 h-screen w-screen xl:hidden ${!showSidebar ? " max-xl:hidden" : ""}`}/>
            <div className={`fixed z-30 bg-white px-14 py-8  left-0 top-0 h-screen w-11/12 flex flex-col gap-4 border-r border-gray-200 shadow-gray-500/60 sm:w-7/12 md:w-2/5 xl:w-1/5 xl:absolute md:shadow-2xl ${!showSidebar ? " max-xl:hidden" : ""}`}>
                <motion.button
                    onClick={() => setShowSidebar(false)}
                    whileTap={{ rotate: 180 }}
                    transition={{duration: 0.5}}
                    className={`text-blue-950 absolute top-10 right-10 xl:hidden`}>
                    <FaArrowLeft size={24}/>
                </motion.button>
                <div className="mt-20 xl:mt-30 flex flex-col gap-8 justify-between items-center mb-10 container">
                    {filters.map((filter, index) => (
                        <motion.button
                            key={index}
                            className={`text-2xl text-white bg-blue-950 px-4 py-2 rounded-lg w-full md:w-11/12 max-w-[12rem] ${filterType === filter ? "bg-gray-500/80" : ""}`}
                            whileHover={{ y: -10 }}
                            onClick={() => setFilterType(filter)}
                        >{capitalizeWords(filter)}</motion.button>
                    ))}
                </div>

                <motion.button
                    className={`self-center text-2xl text-white bg-blue-950 px-4 py-2 rounded-lg w-1/2 max-w-[12rem] ${filterType === "all" ? "bg-gray-500/80" : ""}`}
                    whileHover={{ y: -10 }}
                    onClick={() => setFilterType("all")}
                >
                    All
                </motion.button>

                <motion.button
                    onClick={() => setShowUser(!showUser)}
                    whileHover={{ y: -10 }}
                    className=" text-white bg-blue-900 rounded-full h-[5rem] w-[5rem] self-center flex justify-center items-center mt-auto mb-0"
                >
                    <CiUser size={50} />
                </motion.button>
            </div>

            {showUser && <UserInfo />}
        </div>
    );

};
export default Sidebar;
