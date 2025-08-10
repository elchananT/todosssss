import { create } from "zustand";
import type { FilterState, SearchState, UIState } from "./types.ts";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface Users {
  users: User[];
  addUser: (user: Omit<User, "id">) => User;
  updateUserById: (id: number, user: Partial<User>) => void;
  deleteUserById: (id: number) => void;
  findUserById: (id: number) => User | undefined;
  findUserByEmailAndPassword: (
    email: string,
    password: string
  ) => User | undefined;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  description: string;
  dateEnd: Date;
  isDone: boolean;
}

interface Todos {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => Todo;
  updateTodoById: (
    userId: number,
    id: number,
    todo: Partial<Todo>
  ) => Todo | undefined;
  deleteTodoById: (userId: number, id: number) => void;
  getTodosByUserId: (userId: number) => Todo[] | undefined;
  getTodoById: (UserId: number, id: number) => Todo | undefined;
  getTodosInADay: (userId: number) => Todo[] | undefined;
  getTodosInAMonth: (userId: number) => Todo[] | undefined;
  getTodosInAYear: (userId: number) => Todo[] | undefined;
}

interface SharedTodo {
  id: number;
  userId: number;
  users: number[];
  title: string;
  description: string;
  dateEnd: Date;
  isDone: boolean;
}

interface SharedTodos {
  sharedTodos: SharedTodo[];
  addSharedTodo: (sharedTodo: Omit<SharedTodo, "id">) => SharedTodo;
  updateSharedTodoById: (
    userId: number,
    id: number,
    sharedTodo: Partial<SharedTodo>
  ) => void;
  deleteSharedTodoById: (userId: number, id: number) => void;
  getSharedTodosByUserId: (userId: number) => SharedTodo[] | undefined;
  getSharedTodoById: (UserId: number, id: number) => SharedTodo | undefined;
}

interface CurrentUser {
  user: User | undefined;
  setUser: (user: User) => void;
}

// @ts-ignore
const useUsers = create<Users>((set, get) => {
  return {
    users: [],

    addUser: (user) => {
      const newUser: User = {
        id: get().users.length + 1,
        ...user,
      };

      set((state) => ({
        users: [...state.users, newUser],
      }));

      return newUser;
    },

    updateUserById: (id, updatedUser) => {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        ),
      }));
    },

    deleteUserById: (id) => {
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    },

    findUserById: (id) => {
      return get().users.find((user) => user.id === id);
    },

    findUserByEmailAndPassword: (email, password) => {
      return get().users.find(
        (user) => user.email === email && user.password === password
      );
    },
  };
});

const useTodos = create<Todos>((set, get) => ({
  todos: [],

  addTodo: (todo) => {
    const newTodo: Todo = {
      id: get().todos.length + Math.random(),
      ...todo,
    };
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
    return newTodo;
  },

  updateTodoById: (userId, id, updatedTodo) => {
    set((state) => ({
      todos: state.todos.map((t) =>
        t.userId === userId && t.id === id ? { ...t, ...updatedTodo } : t
      ),
    }));
    return get().todos.find((todo) => todo.userId === userId && todo.id === id);
  },

  deleteTodoById: (userId, id) => {
    set((state) => ({
      todos: state.todos.filter((t) => !(t.userId === userId && t.id === id)),
    }));
  },

  getTodosByUserId: (userId) => {
    return get().todos.filter((t) => t.userId === userId);
  },

  getTodoById: (userId, id) => {
    return get().todos.find((t) => t.userId === userId && t.id === id);
  },

  getTodosInADay: (userId) => {
    const today = new Date();
    return get().todos.filter((t) => {
      if (t.userId !== userId) return false;
      const date = new Date(t.dateEnd);
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    });
  },

  getTodosInAMonth: (userId) => {
    const today = new Date();
    return get().todos.filter((t) => {
      if (t.userId !== userId) return false;
      const date = new Date(t.dateEnd);
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
      );
    });
  },

  getTodosInAYear: (userId) => {
    const today = new Date();
    return get().todos.filter((t) => {
      if (t.userId !== userId) return false;
      const date = new Date(t.dateEnd);
      return date.getFullYear() === today.getFullYear();
    });
  },
}));

const useSharedTodos = create<SharedTodos>((set, get) => ({
  sharedTodos: [],

  addSharedTodo: (sharedTodo) => {
    const newSharedTodo: SharedTodo = {
      id: get().sharedTodos.length + 1,
      ...sharedTodo,
    };
    set((state) => ({
      sharedTodos: [...state.sharedTodos, newSharedTodo],
    }));
    return newSharedTodo;
  },

  updateSharedTodoById: (userId, id, updatedSharedTodo) => {
    set((state) => ({
      sharedTodos: state.sharedTodos.map((t) =>
        t.users.includes(userId) && t.id === id
          ? { ...t, ...updatedSharedTodo }
          : t
      ),
    }));
  },

  deleteSharedTodoById: (userId, id) => {
    set((state) => ({
      sharedTodos: state.sharedTodos.filter(
        (t) => !(t.users.includes(userId) && t.id === id)
      ),
    }));
  },

  getSharedTodosByUserId: (userId) => {
    return get().sharedTodos.filter((t) => t.users.includes(userId));
  },

  getSharedTodoById: (userId, id) => {
    return get().sharedTodos.find(
      (t) => t.users.includes(userId) && t.id === id
    );
  },
}));

const useFilterStore = create<FilterState>((set) => ({
  filterType: "all",
  setFilterType: (filter) => set({ filterType: filter }),
}));

const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

const useUIStore = create<UIState>((set) => ({
  showUser: false,
  setShowUser: (show) => set({ showUser: show }),

  showTodoForm: false,
  setShowTodoForm: (show) => set({ showTodoForm: show }),

  showLoginForm: false,
  setShowLoginForm: (show) => set({ showLoginForm: show }),

  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),

  showUpdateTodoForm: false,
  setShowUpdateTodoForm: (show) => set({ showUpdateTodoForm: show }),
}));

const useUserStore = create<CurrentUser>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

export {
  useTodos,
  useUsers,
  useSharedTodos,
  useUIStore,
  useFilterStore,
  useSearchStore,
  useUserStore,
};
