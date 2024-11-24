import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const AddTodoModal = ({ isOpen, onClose, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  const handleAddTodo = () => {
    const newErrors = {};

    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!tags) newErrors.tags = 'Tags are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    onAddTodo({ title, description, dueDate, tags: tags.split(',').map((tag) => tag.trim()) });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal wrapper with explicit width */}
      <div className="w-full max-w-[700px] bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 text-center">
            Add New To-Do
          </Dialog.Title>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                className={`w-full mt-1 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:outline-none px-3 py-2`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className={`w-full mt-1 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:outline-none px-3 py-2`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className={`w-full mt-1 border ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:outline-none px-3 py-2`}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                className={`w-full mt-1 border ${errors.tags ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:outline-none px-3 py-2`}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white"
              onClick={handleAddTodo}
            >
              Add To-Do
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTodoModal;
