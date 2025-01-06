import PropTypes from "prop-types";
import Task from "./Task";

const Column = ({ title, tasks, onTaskDrop, onEdit, onDelete }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    onTaskDrop(taskId, title);
  };

  return (
    <div
      className="bg-gray-100  p-4 rounded shadow-md shadow-indigo-600 min-h-[300px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
