import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("barToken");
    if (!token) {
      setError("Please login with an admin account to view users.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://restorentproject.onrender.com/api/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (userId, action) => {
    const token = localStorage.getItem("barToken");
    if (!token) {
      toast.error("Admin token is missing. Please login again.");
      return;
    }

    try {
      const url = `https://restorentproject.onrender.com/api/users/${userId}/${action}`;
      await axios.patch(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(
        `${action === "block" ? "Blocked" : "Unblocked"} user successfully`,
      );
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "User action failed");
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("barToken");
    if (!token) {
      toast.error("Admin token is missing. Please login again.");
      return;
    }

    try {
      await axios.delete(
        `https://restorentproject.onrender.com/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        <h1 className="text-3xl font-semibold text-white">User Management</h1>
        <p className="mt-3 text-slate-300">
          Review registered users, block or unblock access, and delete accounts
          as needed.
        </p>
      </div>

      <div className="rounded-4xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
        {error ? (
          <p className="text-rose-300">{error}</p>
        ) : loading ? (
          <p className="text-slate-300">Loading users...</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 rounded-4xl bg-slate-900/80 p-4 text-slate-300 sm:grid-cols-4">
              <span className="font-medium text-white">Name</span>
              <span className="font-medium text-white">Email</span>
              <span className="font-medium text-white">Role</span>
              <span className="font-medium text-white">Status</span>
            </div>
            {users.length === 0 ? (
              <p className="text-slate-300">No users found</p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-2 gap-4 rounded-4xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200 sm:grid-cols-4"
                >
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <span className="capitalize">{user.role}</span>
                  <span
                    className={
                      user.status === "blocked"
                        ? "text-rose-300"
                        : "text-emerald-300"
                    }
                  >
                    {user.status}
                  </span>
                  <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-4">
                    <button
                      onClick={() =>
                        handleAction(
                          user._id,
                          user.status === "blocked" ? "unblock" : "block",
                        )
                      }
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
                    >
                      {user.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-rose-500 hover:text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsersPage;
