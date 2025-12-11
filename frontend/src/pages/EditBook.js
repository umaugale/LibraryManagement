import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    api.get("/books/getBooks").then((res) => {
      console.log("res",res.data);

        console.log("id",typeof id);
      
      const book = res.data.find((b) => b.id === Number(id));
      console.log("book",book);
      
      if (book) setData(book);
    });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    console.log("save",data);
    
    await api.put(`/books/update/${id}`, data);
    alert("Saved Successfully")
    navigate("/nav");
  };

  const changeStatus = async () => {
    const newStatus = data.status === "AVAILABLE" ? "BORROWED" : "AVAILABLE";
    await api.put(`/books/status/${id}`, { status: newStatus });
    setData({ ...data, status: newStatus });
  };

  return (
    <div className="border border-gray-200 m-4 w-1/2 ">
      <h2 className="m-8 text-black font-bold text-xl">Edit Book</h2>

      <form>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <br/>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          value={data.author}
          onChange={(e) => setData({ ...data, author: e.target.value })}
        />
          <br/>
        <input
          className="border border-gray-400 mb-4 ml-6 rounded px-4 py-2 text-base placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none w100 "
          value={data.publishedYear}
          onChange={(e) =>
            setData({ ...data, publishedYear: Number(e.target.value) })
          }
        />
        <br/>
        <div>
          
        </div>
        <button
         className="text-black bg-blue-300 ml-8 mb-4 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-2.5 focus:outline-none"
         onClick={save}>Save</button>
          <button
       className="text-black bg-blue-300 ml-8 mb-4 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-2.5 focus:outline-none"
      onClick={changeStatus}>
        Mark as {data.status === "AVAILABLE" ? "Borrowed" : "Available"}
      </button>
      </form>
     
    </div>
  );
}
