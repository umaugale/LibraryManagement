import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      login(token, payload.role);

      navigate("/nav");
    } catch(err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="border border-gray-200 m-4 w-1/2 ">
      <h2 className="m-8 text-black font-bold text-xl">Login</h2>
      <form 
      onSubmit={submit}>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <br/>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br/>
      
        <button 
        className="text-black bg-blue-300 ml-8 mb-4 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-2.5 focus:outline-none"
        >Login</button>       
        <Link to="/register" className="text-blue-500 ml-4 underline text-md">Create new account</Link>
      </form>
    </div>
  );
}
