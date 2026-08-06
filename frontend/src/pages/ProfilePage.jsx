import { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("barToken");
      if (!token) {
        setError("Please login to view your profile.");
        return;
      }

      try {
        const response = await axios.get(
          "https://restorentproject.onrender.com/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProfile(response.data.user);
      } catch (err) {
        setError(err.response?.data?.error || "Could not load profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-950/80 p-10 shadow-xl shadow-slate-950/40 ring-1 ring-slate-700/70">
      <h1 className="text-3xl font-semibold text-white">Your Profile</h1>
      {error ? (
        <p className="mt-6 text-slate-300">{error}</p>
      ) : profile ? (
        <div className="mt-8 space-y-5 text-slate-300">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-300">
              Name
            </p>
            <p className="mt-2 text-xl text-white">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-300">
              Email
            </p>
            <p className="mt-2 text-xl text-white">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-300">
              Role
            </p>
            <p className="mt-2 text-xl text-white">{profile.role}</p>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-slate-300">Loading profile…</p>
      )}
    </div>
  );
}

export default ProfilePage;
