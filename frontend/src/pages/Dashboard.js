import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
      const getBook = async () => {
        try{
          const response = await api.get("/books/getBooks");
          console.log("response",response);
          setBooks(response.data); 
        }
        catch(err){
          console.log(err);
          
        }
      }
      getBook()
},[]);
const deleteBook = async(id) => {
  console.log("id",id);

  const deleteList = books.filter(i => i.id !== id)
  console.log("list",deleteList);
  await api.delete(`/books/del/${id}`)
  //  navigate("/dash")
    alert('delete successfully')
    setBooks(deleteList)
  
 }

  return (
    <div className="ml-4">
      <h2 className="m-8 text-black font-bold text-xl">Books</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Status</th>
             <th className="px-4 py-2 border">Published year</th>
            {user?.role === "ADMIN" && <th className="px-4 py-2 border">Edit Actions</th>}
            {user?.role === "ADMIN" && <th className="px-4 py-2 border">Delete Actions</th>}
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td className="px-4 py-2 border">{b.title}</td>
              <td className="px-4 py-2 border">{b.author}</td>
              <td className="px-4 py-2 border">{b.status}</td>
              <td className="px-4 py-2 border">{b.publishedYear}</td>

              {user?.role === "ADMIN" && (
                <td className="px-4 py-2 border">
                  <Link to={`/edit-book/${b.id}`} className="text-blue-500 ml-4 underline text-md">Edit</Link>
                </td>
              )}

                {user?.role === "ADMIN" && (
                <td className="px-4 py-2 border">
                  <button
                   className="text-black bg-blue-200 ml-3 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium text-md px-4 py-1 focus:outline-none"
                   onClick={() => deleteBook(b.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
