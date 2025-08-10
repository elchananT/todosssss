import MainContent from "./components/MainContent.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Navigation from "./components/Navigation.tsx";
import { useUIStore} from "./store.ts";
import AddTodoForm from "./components/AddTodoForm.tsx";

const App = () => {
    const { showTodoForm } = useUIStore();

    return (
        <div className="md:min-h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1 items-center p-2 mt-4 xl:items-end">
                <Navigation />
                <MainContent />
            </div>


            {showTodoForm && <AddTodoForm />}
        </div>
    );
};

export default App
