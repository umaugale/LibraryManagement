import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [data, setData] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  const navigate = useNavigate();
  const submit = async (e) => {
  e.preventDefault();
  try {
     await api.post("/books/book/reg", data);
    alert("Book created successfully!");
    navigate("/dash");
  } catch (err) {
    const msg = err?.response?.data?.message || "Something went wrong";
    alert(msg);
  }
};


  return (
    <div className="border border-gray-200 m-4 w-1/2 ">
      <h2 className="m-8 text-black font-bold text-xl">Add Book</h2>
      <form onSubmit={submit}>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          placeholder="Title"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        /> <br/>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          placeholder="Author"
          onChange={(e) => setData({ ...data, author: e.target.value })}
        /> <br/>
        <input
        type="number"
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          placeholder="Published Year"
          onChange={(e) =>
            setData({ ...data, publishedYear: Number(e.target.value) })
          }
        /> <br/>
        <button
          className="text-black bg-blue-300 ml-8 mb-4 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-2.5 focus:outline-none"
        >Add</button>
      </form>
    </div>
  );
}
