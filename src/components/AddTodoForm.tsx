import React from "react";
import { useForm } from "react-hook-form";
import { useTodos, useUserStore, useUIStore } from "../store";

type FormValues = {
    title: string;
    description?: string;
    dateEnd: string;
};

const AddTodoForm: React.FC = () => {
    const addTodo = useTodos((s) => s.addTodo);
    const user = useUserStore((s) => s.user);
    const setShowTodoForm = useUIStore((s) => s.setShowTodoForm);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            dateEnd: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        if (!user) {
            alert("Please login first.");
            return;
        }

        const date = data.dateEnd ? new Date(data.dateEnd) : new Date();

        const newTodo = addTodo({
            userId: user.id,
            title: data.title.trim(),
            description: data.description?.trim() || "",
            dateEnd: date,
            isDone: false,
        });

        reset();
        setShowTodoForm(false);
        return newTodo;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6">
                <header className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Add Todo</h2>
                    <button
                        type="button"
                        onClick={() => setShowTodoForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            {...register("title", { required: "Title is required", minLength: { value: 2, message: "Too short" } })}
                            type="text"
                            placeholder="Enter title"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.title ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-blue-200"
                            }`}
                        />
                        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register("description")}
                            rows={4}
                            placeholder="Optional description..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Due date & time</label>
                        <input
                            {...register("dateEnd", { required: "Due date is required" })}
                            type="datetime-local"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.dateEnd ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-blue-200"
                            }`}
                        />
                        {errors.dateEnd && <p className="text-red-600 text-sm mt-1">{errors.dateEnd.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setShowTodoForm(false);
                            }}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodoForm;
