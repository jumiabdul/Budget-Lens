export default function Profile() {
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">

                <h1 className="text-2xl text-pink-600 font-bold">Profile</h1>
                <div className="flex justify-between mt-7">
                    <img src="null" alt="Profile Pic"
                        className="w-24 h-24 rounded-full border-3 border-purple-700" />
                    <div className="space-y-6">
                        <div className="flex justify-around items-center">
                            <span className="text-md text-gray-600 font-bold mr-3 ">Name</span>
                            <span className="text-md text-gray-600 ">John mathew</span>
                        </div>
                        <div className="flex justify-around items-center">
                            <span className="text-md text-gray-600 font-bold mr-3 ">Email address</span>
                            <span className="text-md text-gray-600 ">JohnMathew@gmail.com</span>
                        </div>
                    </div>
                </div>
                <button type="submit"
                    className=" mt-7 w-50 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 hover:cursor-pointer">
                    Change Password
                </button>
                <button type="submit"
                    className=" mt-7 w-50 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 hover:cursor-pointer">
                    Log Out
                </button>

            </div>
        </div>
    )
}