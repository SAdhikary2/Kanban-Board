import { useState, useEffect } from "react";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    // Load tasks
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //task drop
  const handleTaskDrop = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  //save tasks
  const handleSaveTask = (task) => {
    setTasks((prev) => {
      const isEditing = currentTask !== null;
      if (isEditing) {
        return prev.map((t) =>
          t.id === task.id ? { ...task, status: t.status } : t
        );
      } else {
        return [...prev, { ...task, status: "Pending" }];
      }
    });
    setCurrentTask(null);
    setShowModal(false);
  };

  //edit tasks
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  //delete tasks
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Task
      </button>
      <div className="grid grid-cols-1 lg:grid-col-3 md:grid-cols-3 gap-4">
        {["Pending", "In Progress", "Done"].map((status) => (
          <Column
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
            onTaskDrop={handleTaskDrop}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
          task={currentTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
