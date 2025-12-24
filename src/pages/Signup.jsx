
const Signup = () => {
    return (

        <div className="p-4 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Form to create account */}
            <form className=" bg-white rounded-2xl shadow-xl p-8 w-full mb-4 max-w-md mx-auto text-center space-y-6 border border-gray-100">
                <div className="space-y-1">
                    <h1 className="text-2xl text-pink-600 font-bold">Sign Up</h1>
                    <h4 className="text-md text-gray-600 font-bold">Create an account to manage your budget</h4>
                </div>
               
                {/*Name field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Full Name </label>
                    <input type="text" placeholder="Enter your full name..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Email-id field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Email Address </label>
                    <input type="email" placeholder="Enter your email id..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Password field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Password </label>
                    <input type="number" placeholder="Enter your password..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Re-enter password field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Confirm Password </label>
                    <input type="number" placeholder="Re-enter your password..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                
                <button type="submit"
                    className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                    Sign Up
                </button>
                <div className="flex items-center justify-center font-semibold text-sm text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    <label>I agree to the terms and conditions</label>
                </div>
            </form>
        </div>
    )
}

export default Signup;