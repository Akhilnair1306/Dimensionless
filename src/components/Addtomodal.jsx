import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoModal from './Addtomodal';

const Todoview = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const todosPerPage = 4; // Increased the number of todos per page

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), ...todo }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter todos based on the search term
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center bg-gray-300 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 mt-10">TODO LIST</h1>
      <div className="w-3/4 md:w-1/2 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add Todo
        </button>
      </div>
      <div className="mt-10 w-full max-w-none">
        <TodoList todos={currentTodos} onDelete={deleteTodo} />
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <ol className="flex justify-center gap-2 text-lg font-medium">
          {/* Previous Page Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 p-3 hover:bg-gray-100"
            >
              <span className="sr-only">Prev Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`block rounded-full border border-gray-300 bg-white p-3 text-center leading-8 text-gray-900 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Next Page Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 p-3 hover:bg-gray-100"
            >
              <span className="sr-only">Next Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ol>
      </div>

      {/* AddTodoModal */}
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
};

export default Todoview;
