
const Login = () => {
    return (

        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl text-pink-600 font-bold mb-2">Budget Lens</h1>
                <h2 className="text-lg font-semibold mb-6">Welcome Back👋</h2>
                {/*Form to login and button to create account*/}
                <form className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block">Email</label>
                        <input type="email" placeholder="username@mail.com"
                            className=" mt-1 px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block">Password</label>
                        <input type="password" placeholder="••••••••"
                            className=" mt-1 px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <button type="submit"
                        className="w-full py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                        Login
                    </button>
                    <button type="button"
                        className="w-full py-2 bg-gray-200 text-violet-800 rounded-md font-semibold hover:bg-gray-300">
                        Create Account
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login;