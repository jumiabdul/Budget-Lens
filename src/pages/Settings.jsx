export default function Settings() {
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">

                <h1 className="text-2xl text-pink-600 font-bold">Settings</h1>
                <button type="submit"
                    className=" mt-7 w-50 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                    Reset Data
                </button>

            </div>
        </div>
    )
}