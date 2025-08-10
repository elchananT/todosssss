import { useForm } from "react-hook-form";
import { useUsers, useUserStore } from "../store";
import SigninButton from "./SubmitButton.tsx";
import { useNavigate } from "react-router-dom";

interface SigninFormInputs {
    email: string;
    password: string;
}

const SigninForm = () => {
    const { findUserByEmailAndPassword } = useUsers();
    const { setUser } = useUserStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm<SigninFormInputs>();

    const handleClick = () => {
        navigate("/register");
    };

    const onSubmit = (formData: SigninFormInputs) => {
        const user = findUserByEmailAndPassword(formData.email, formData.password);

        if (!user) {
            setError("email", { type: "manual", message: "Email or password is incorrect" });
            setError("password", { type: "manual", message: "Email or password is incorrect" });
            return;
        }

        navigate("/");
        setUser(user);
        reset();
    };

    return (
        <div className="h-screen flex justify-center items-center overflowy-y-hidden">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full px-4 py-2 md:w-1/2 xl:w-1/4"
            >
                <h2 className="text-center text-5xl font-bold text-gray-900 mb-10 xl:mb-28">Login</h2>

                <label className="text-lg text-gray-700 mb-2">Email:</label>
                <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="Email"
                    className="py-2 border-2 border-gray-300 rounded-lg px-4"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                <label className="text-lg text-gray-700 mb-2 mt-6">Password:</label>
                <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    placeholder="Password"
                    className="py-2 border-2 border-gray-300 rounded-lg px-4"
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                <SigninButton title="Lon in"/>

                <div className="mt-10 w-full h-full flex items-center gap-2 justify-center">
                    <div className='w-1/3 h-[1px] bg-blue-950 inline-block'/>
                    <span>or</span>
                    <div className='w-1/3 h-[1px] bg-blue-950 inline-block'/>
                </div>
                <button
                    onClick={handleClick}
                    className="text-blue-500 text-lg">Sing up</button>
            </form>

    </div>
    );
};

export default SigninForm;
