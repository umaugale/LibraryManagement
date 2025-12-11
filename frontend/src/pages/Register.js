import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", data);
      alert("User Registered Sucessfully");
      navigate("/");
    } catch(err) {
      console.log("err",err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="border border-gray-200 m-4 w-1/2 ">
      <h2 className="m-8 text-black font-bold text-xl">Register</h2>
      <form onSubmit={submit}>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w-100 "
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <br />
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w-100 "
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button
           className="text-black bg-blue-300 ml-8 mb-4 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-2.5 focus:outline-none"
        >Register</button>
      </form>
    </div>
  );
}
