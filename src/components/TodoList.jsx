import React from "react";
import { Trash, Calendar } from "lucide-react";

const TodoList = ({ todos, onDelete }) => {
  return (
    <div className="p-6 space-y-6 flex flex-col items-center">
      {todos.map((todo) => (
        <article
          key={todo.id}
          className="w-full max-w-4xl hover:animate-background rounded-xl bg-gradient-to-r from-black via-gray-700 to-gray-200 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
          <div className="rounded-[10px] bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 text-center">
              {todo.title}
            </h3>
            <p className="text-sm text-gray-700 text-center mt-2">{todo.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-300"
                />
                <span className="text-sm text-gray-700">Completed</span>
              </label>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={todo.dueDate}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </time>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600"
                onClick={() => onDelete(todo.id)}
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TodoList;
