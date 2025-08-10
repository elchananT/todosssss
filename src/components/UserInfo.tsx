import {useUIStore, useUserStore} from "../store.ts";

const UserInfo = () => {
    const { setShowUser } = useUIStore();
    const { user } = useUserStore();

    return (
        <div className="z-40 bg-black/40 backdrop-blur-xs fixed top-0 flex justify-center items-center h-screen w-screen">
            <div className="z-50 bg-white text-gray-900 text-lg p-4 rounded-xl w-10/12 sm:w-[24rem] h-[14rem] flex flex-col gap-6">
                <h2 className="text-2xl text-gray-900">Info:</h2>
                <div>
                    <p className="text-lg text-gray-700"><span className="text-xl font-semibold text-gray-900">Name:</span> {user?.name}</p>
                    <p className="text-lg text-gray-700"><span className="text-xl font-semibold text-gray-900">Email:</span> {user?.email}</p>
                </div>

                <button
                    className="px-4 py-2 bg-red-800 text-white hover:bg-gray-500 rounded-xl w-1/3"
                    onClick={() => setShowUser(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default UserInfo
