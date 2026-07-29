import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? "text-brand-600" : "text-slate-600 hover:text-brand-600"
    }`;

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <nav className="flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/schedule" className={linkClass}>
            Schedule
          </NavLink>
          <NavLink to="/posts" className={linkClass}>
            Posts
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">
            Logged in as <span className="text-slate-700">{user?.email}</span>
          </span>
          <button
            onClick={handleSignOut}
            className="text-brand-600 font-semibold hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
