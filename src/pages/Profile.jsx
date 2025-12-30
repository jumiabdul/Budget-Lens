import { useEffect, useState } from "react"
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data())
            } else {
                console.log("User not Logged in");

            }
        })
    }
    useEffect(() => {
        fetchUserData();
    }, [])

    async function handleLogout() {
        try {
            await auth.signOut();
            navigate("/");
            console.log("User logged out successfully")
        } catch (error) {
            console.error("Error logging out", error.message)
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl text-pink-600 font-bold">Profile</h1>

                {userDetails ? (
                    <div>
                        <div className="space-y-6">
                            <div className="mt-5 flex justify-around items-center">
                                <span className="text-md text-gray-600 font-bold mr-3 ">Name</span>
                                <span className="text-md text-gray-600 ">{userDetails.fullName}</span>
                            </div>
                            <div className="flex justify-around items-center">
                                <span className="text-md text-gray-600 font-bold mr-3 ">Email address</span>
                                <span className="text-md text-gray-600 ">{userDetails.email}</span>
                            </div>
                        </div>

                        <button type="submit"
                            className=" mt-7 w-50 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 hover:cursor-pointer">
                            Change Password
                        </button>
                        <button type="submit" onClick={handleLogout}
                            className=" mt-7 w-50 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 hover:cursor-pointer">
                            Log Out
                        </button>
                    </div>
                ) : (<p className="mt-5 text-gray-700 font-bold">Loading....</p>)}
            </div>
        </div>
    )
}