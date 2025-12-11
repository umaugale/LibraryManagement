import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext); 

  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link>Dashboard</Link>

      {user?.role === "ADMIN" && (
        <Link to="/add-book"className="text-blue-500 ml-4 underline text-md">
          Add Book
        </Link>
      )}

      <button style={{ float: "right" }} onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
