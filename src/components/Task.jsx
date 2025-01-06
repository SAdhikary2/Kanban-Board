import PropTypes from "prop-types";

// Icons
import { MdEditDocument, MdDelete } from "react-icons/md";

const Task = ({ task, onEdit, onDelete, onDragStart }) => {
  return (
    <div
      className="bg-indigo-600 text-white p-4 rounded shadow mb-2"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{task.title}</h3>
        <div className="flex gap-2">
          <MdEditDocument
            onClick={() => onEdit(task)}
            className="cursor-pointer hover:underline mr-2 text-2xl"
          />
          <MdDelete
            onClick={() => onDelete(task.id)}
            className="cursor-pointer hover:underline text-2xl"
          />
        </div>
      </div>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

// Add prop types validation
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default Task;
