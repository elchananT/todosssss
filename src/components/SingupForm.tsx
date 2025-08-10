import { useForm } from "react-hook-form";
import {useUsers, useUserStore} from "../store"; // הנתיב בהתאם למיקום שלך
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton.tsx";
import { motion } from "motion/react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {AnimatePresence} from "framer-motion";

interface SignupFormInputs {
    name: string;
    email: string;
    password: string;
}

export function SignupForm() {
    const { addUser, users } = useUsers();
    const { setUser } = useUserStore()
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignupFormInputs>();

    const handleClick = () => {
        navigate("/login");
    };

    const onSubmit = (formData: SignupFormInputs) => {
        const emailExists = users.some((u) => u.email === formData.email);
        if (emailExists) {
            setErrorMsg("Email already registered");
            setSuccess(false);
            return;
        }

        const user = addUser(formData);
        setUser(user);
        setSuccess(true);
        setErrorMsg("");
        reset();
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div className="h-screen flex justify-center items-center overflowy-y-hidden">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full px-4 py-2 md:w-1/2 xl:w-1/4"
            >
                <h2 className="text-center text-5xl font-bold text-gray-900 mb-5 xl:mb-28">Sign up</h2>

                <label className="text-lg text-gray-700">Name:</label>
                <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Name"
                    className="py-2 border-2 border-gray-300 rounded-lg px-4"
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                <label className="text-lg text-gray-700">Email:</label>
                <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="Email"
                    className="py-2 border-2 border-gray-300 rounded-lg px-4"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                <label className="text-lg text-gray-700">Password:</label>
                <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    placeholder="Password"
                    className="py-2 border-2 border-gray-300 rounded-lg px-4"
                />
                {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                )}

                <SubmitButton title="Sign up"/>

                {errorMsg && (
                    <AnimatePresence>
                        <motion.div
                            className="self-center fixed bottom-0 sm:bottom-5 w-11/12 sm:right-5 sm:w-[27rem] h-[15rem] bg-red-300/90 backdrop-blur-xs p-4 rounded-xl border-2 border-red-400"
                            initial={{ x: 400, opacity: 0 }}
                            animate={{
                                x: [400, 0, 0, 400],
                                opacity: [0.8, 1, 1, 0.8],
                            }}
                            transition={{
                                duration: 8,
                                times: [0, 0.1, 0.8, 1],
                                ease: "easeInOut",
                            }}
                        >
                            <div className="text-red-600 bg-red-400/90 mt-6 ml-6 rounded-full backdrop-blur-xl h-[3rem] w-[3rem] flex justify-center items-center">
                                <RxCross2 size={36}/>
                            </div>

                            <div className="p-4">
                                <h3 className="text-red-700 text-2xl font-semibold">Something failed</h3>
                                <p className="text-lg text-red-500">Please try again</p>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                )}

                {success && (
                    <AnimatePresence>
                        <motion.div
                            className="self-center fixed bottom-0 sm:bottom-5 w-11/12 sm:right-5 sm:w-[27rem] h-[15rem] bg-green-300/90 backdrop-blur-xs p-4 rounded-xl border-2 border-green-400"
                            initial={{ x: 400, opacity: 0 }}
                            animate={{
                                x: [400, 0, 0, 400],
                                opacity: [0.8, 1, 1, 0.8],
                            }}
                            transition={{
                                duration: 8,
                                times: [0, 0.1, 0.8, 1],
                                ease: "easeInOut",
                            }}
                        >
                            <div className="text-green-600 bg-green-400/90 mt-6 ml-6 rounded-full backdrop-blur-xl h-[3rem] w-[3rem] flex justify-center items-center">
                                <IoMdCheckmark size={36}/>
                            </div>

                            <div className="p-4">
                                <h3 className="text-green-700 text-2xl font-semibold">User Create Successfully</h3>
                                <p className="text-lg text-green-500">Thank you for signing up!</p>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                )}

                <div className="mt-10 w-full h-full flex items-center gap-2 justify-center">
                    <div className='w-1/3 h-[1px] bg-blue-950 inline-block'/>
                    <span>or</span>
                    <div className='w-1/3 h-[1px] bg-blue-950 inline-block'/>
                </div>
                <button
                    onClick={handleClick}
                    className="text-blue-500 text-lg">Sing in</button>
            </form>
        </div>
    );
}

export default SignupForm
