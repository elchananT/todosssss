export type FilterType = "day" | "month" | "year" | "shared todos" | "all";

export interface FilterState {
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
}

export interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface UIState {
  showUser: boolean;
  setShowUser: (show: boolean) => void;

  showTodoForm: boolean;
  setShowTodoForm: (show: boolean) => void;

  showLoginForm: boolean;
  setShowLoginForm: (show: boolean) => void;

  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;

  showUpdateTodoForm: boolean;
  setShowUpdateTodoForm: (show: boolean) => void;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  description: string;
  dateEnd: Date;
  isDone: boolean;
}

export interface TodoCardProps {
  todo: Todo | SharedTodo;
}

export interface SharedTodo {
  id: number;
  userId: number;
  users: number[];
  title: string;
  description: string;
  dateEnd: Date;
  isDone: boolean;
}
