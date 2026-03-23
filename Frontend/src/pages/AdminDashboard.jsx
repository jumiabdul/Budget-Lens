import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

// STAT CARD COMPONENT
const Card = ({ title, value, color }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className={`text-2xl font-bold mt-2 ${color}`}>
            {value}
        </h2>
    </div>
);

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch users
    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get("/api/admin/users");
            setUsers(res.data.data.users);
        } catch (err) {
            toast.error("Failed to load users");
        }
    };

    // Fetch stats
    const fetchStats = async () => {
        try {
            const res = await axiosInstance.get("/api/admin/statistics");
            setStats(res.data.data);
        } catch (err) {
            toast.error("Failed to load stats");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchUsers(), fetchStats()]);
            setLoading(false);
        };
        loadData();
    }, []);

    //  Stats
    const totalUsers = stats?.users?.total || 0;
    const activeUsers = stats?.users?.active || 0;
    const inactiveUsers = stats?.users?.inactive || 0;
    const admins = stats?.users?.admins || 0;

    const recentUsers = [...(users || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    // Actions
    const handleDeactivate = async (id, reason) => {
        try {
            setActionLoading(true);
            await axiosInstance.put(`/api/admin/users/${id}/deactivate`, { reason });
            toast.success("User deactivated");
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleActivate = async (id) => {
        try {
            setActionLoading(true);
            await axiosInstance.put(`/api/admin/users/${id}/activate`);
            toast.success("User activated");
            fetchUsers();
        } catch (error) {
            toast.error("Failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setActionLoading(true);
            await axiosInstance.delete(`/api/admin/users/${id}`);
            toast.success("User deleted");
            fetchUsers();
        } catch (error) {
            toast.error("Failed");
        } finally {
            setActionLoading(false);
        }
    };

    const openModal = (user, type) => {
        setSelectedUser(user);
        setActionType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setActionType("");
    };

    if (loading) {
        return <div className="text-white text-center mt-20">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#141033] to-[#0b0720] text-gray-200 p-6 space-y-8">

            {/* HEADER */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-500 text-sm">Manage users & platform</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Users" value={totalUsers} color="text-indigo-400" />
                <Card title="Active Users" value={activeUsers} color="text-emerald-400" />
                <Card title="Inactive Users" value={inactiveUsers} color="text-red-400" />
                <Card title="Admins" value={admins} color="text-purple-400" />
            </div>

            {/* INSIGHTS */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Recent Users */}
                <div className="xl:col-span-2 bg-white/5 p-6 rounded-2xl border border-purple-900/30">
                    <h2 className="mb-4 font-semibold">Recent Users</h2>

                    {recentUsers.map(u => (
                        <div key={u._id} className="flex justify-between border-b border-white/10 py-2">
                            <div>
                                <p className="text-sm">{u.name}</p>
                                <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(u.createdAt).toLocaleDateString("en-IN")}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Health */}
                <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/30 text-center">
                    <p className="text-3xl font-bold text-indigo-400">
                        {totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0}%
                    </p>
                    <p className="text-xs text-gray-500">Active Ratio</p>
                </div>
            </div>

            {/* USERS TABLE */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-white/10 text-gray-300">
                        <tr>
                            <th className="p-3 text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t border-white/10 hover:bg-white/5 transition">

                                <td className="p-3 text-center align-middle">
                                    {user.name}
                                </td>

                                <td className="text-center align-middle">{user.email}</td>

                                <td className="text-center align-middle">
                                    <div className="flex flex-col items-center">
                                        <span className={`px-2 py-1 rounded text-xs ${user.isActive
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                            }`}>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>

                                        {/* Show reason */}
                                        {!user.isActive && user.deactivationReason && (
                                            <p className="text-xs text-red-400 mt-1">
                                                Reason: {user.deactivationReason}
                                            </p>
                                        )}
                                    </div>
                                </td>

                                <td className="text-center align-middle">{user.role}</td>

                                <td className="text-center align-middle">
                                    <div className="inline-flex gap-2">
                                        {user.isActive ? (
                                            <button
                                                onClick={() => openModal(user, "deactivate")}
                                                className="text-yellow-400 hover:underline"
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleActivate(user._id)}
                                                className="text-green-400 hover:underline"
                                            >
                                                Activate
                                            </button>
                                        )}

                                        <button
                                            onClick={() => openModal(user, "delete")}
                                            className="text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <ConfirmModal
                isOpen={isModalOpen}
                actionType={actionType}
                loading={actionLoading}
                title={
                    actionType === "delete"
                        ? "Delete User"
                        : "Deactivate User"
                }
                message={
                    actionType === "delete"
                        ? "This action cannot be undone"
                        : "Provide a reason for deactivation"
                }
                confirmText={
                    actionType === "delete" ? "Delete" : "Deactivate"
                }
                confirmColor={actionType === "delete" ? "red" : "yellow"}
                onClose={closeModal}
                onConfirm={async (reason) => {
                    if (!selectedUser) return;

                    if (actionType === "deactivate") {
                        handleDeactivate(selectedUser._id, reason);
                    } else {
                        handleDelete(selectedUser._id);
                    }
                    closeModal();
                }}
            />
        </div>
    );
};

export default AdminDashboard;

