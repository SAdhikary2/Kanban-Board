import PropTypes from "prop-types";
import Task from "./Task";

const Column = ({ title, tasks, onTaskDrop, onEdit, onDelete }) => {
  // Track touch movement for mobile drag-and-drop
  const handleTouchStart = (e, taskId) => {
    e.dataTransfer = { taskId }; 
  };

  const handleTouchMove = (e) => e.preventDefault(); 

  const handleTouchEnd = (e) => {
    const taskId = e.dataTransfer?.taskId;
    if (taskId) {
      onTaskDrop(taskId, title);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    onTaskDrop(taskId, title);
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded shadow-md shadow-indigo-600 min-h-[300px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <hr className="mb-2 text-2xl" />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={(e, taskId) => e.dataTransfer.setData("taskId", taskId)}
          onTouchStart={(e) => handleTouchStart(e, task.id)}
        />
      ))}
    </div>
  );
};

// Add prop types validation
Column.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onTaskDrop: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Column;
