import PropTypes from "prop-types";
import { useState } from "react";

const AddTaskModal = ({ onClose, onSave, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleSubmit = () => {
    if (title) {
      onSave({ id: task?.id || Date.now().toString(), title, description });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-[80%] lg:w-[30%] md:w-[50%] ">
        <h2 className="text-lg font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border p-2 rounded w-full mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:underline mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
AddTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default AddTaskModal;
