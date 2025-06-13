import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [todo, setTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAdd = () => {
    if (!todo.trim()) {
      setValidationMessage("Kindly add something");
      return;
    }

    const newTodos = [...todos];
    if (editIndex !== null) {
      newTodos[editIndex] = todo;
      setEditIndex(null);
    } else {
      newTodos.push(todo);
    }

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodo("");
  };

  const handleDeleteAll = () => {
    setTodos([]);
    localStorage.setItem("todos", JSON.stringify([]));
    setEditIndex(null);
    setTodo("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    if (editIndex === index) {
      setEditIndex(null);
      setTodo("");
    }
  };

  const handleEdit = (index) => {
    setTodo(todos[index]);
    setEditIndex(index);
  };

  return (
    <>
      <Navbar isMobile={isMobile} />
      <div className="mx-auto max-w-4xl w-full my-5 rounded-xl p-4 md:p-6 bg-violet-100 min-h-[80vh]">
        <div className="AddTodo mb-6">
          <h2 className="text-lg font-bold mb-3">Add a Todo</h2>
          <div className="w-full flex gap-2">
            <input
              type="text"
              required
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
                setValidationMessage("");
              }}
              onKeyDown={handleKeyPress}
              placeholder="Enter your todo..."
              className="w-full p-2 md:p-2.5 rounded-md border-2 border-violet-500 focus:border-violet-700 focus:outline-none"
              aria-label="Todo input"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-900 p-2 md:px-4 text-white rounded-md transition-colors duration-200 font-medium"
              aria-label={editIndex !== null ? "Update todo" : "Add todo"}
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          {validationMessage && (
            <p className="text-red-500 text-sm mt-1">{validationMessage}</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">Your ToDos</h2>
            <span className="bg-violet-600 text-white px-2 py-1 rounded-full text-sm">
              {todos.length}
            </span>
          </div>
          {todos.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-md transition-colors duration-200 text-sm"
              aria-label="Delete all todos"
            >
              {isMobile ? "🗑️ All" : "Delete All"}
            </button>
          )}
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No todos yet. Add one above!
          </div>
        ) : (
          <div className="todos space-y-3">
            {todos.map((item, index) => (
              <div
                key={index}
                className="todo flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text mb-2 md:mb-0 flex-1 break-words">
                  {item}
                </div>
                <div className="buttons flex gap-2 self-end md:self-auto">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-violet-600 hover:bg-violet-700 p-2 text-white rounded-md transition-colors duration-200 text-sm"
                    aria-label={`Edit todo: ${item}`}
                  >
                    {isMobile ? "✏️" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-md transition-colors duration-200 text-sm"
                    aria-label={`Delete todo: ${item}`}
                  >
                    {isMobile ? "🗑️" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
