import { useState } from "react";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!name.trim()) {
            newErrors.name = "Full name is required";

        } else if (name.length < 3) {
            newErrors.name = "Name must be atleast 3 characters";

        }

        if (!email.trim()) {
            newErrors.email = "Email is required";

        } else if (emailRegex.test(email) === false) {
            newErrors.email = "Please provide proper valid email";

        }

        if (!password.trim()) {
            newErrors.password = "Password is required";

        } else if (password.length < 8) {
            newErrors.password = "Password must be atleast 8 characters";

        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = "Password do not match";
        }

        if (!agree) {
            newErrors.agree = "You must agree to terms and conditions before signup";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert(`SignUp Successfull!\n Name : ${name} \n Email : ${email}`)

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAgree(false);
            setErrors({});
        }
    }


    return (

        <div className="p-4 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Form to create account */}
            <form onSubmit={handleSubmit}
                className=" bg-white rounded-2xl shadow-xl p-8 w-full mb-4 max-w-md mx-auto text-center space-y-6 border border-gray-100">
                <div className="space-y-1">
                    <h1 className="text-2xl text-pink-600 font-bold">Sign Up</h1>
                    <h4 className="text-md text-gray-600 font-bold">Create an account to manage your budget</h4>
                </div>

                {/*Name field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Full Name </label>
                    <input value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" placeholder="Enter your full name..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/*Email-id field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Email Address </label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder="Enter your email id..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/*Password field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Password </label>
                    <input value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder="Enter your password..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                </div>

                {/*Re-enter password field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Confirm Password </label>
                    <input value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" placeholder="Re-enter your password..."
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <button disabled={!agree}
                    type="submit"
                    className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                    Sign Up
                </button>
                <div className="flex items-center justify-center font-semibold text-sm text-gray-700">
                    <input checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        type="checkbox" className="mr-2" />
                    <label>I agree to the terms and conditions</label>
                </div>
                {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

            </form>
        </div>
    )
}

export default Signup;