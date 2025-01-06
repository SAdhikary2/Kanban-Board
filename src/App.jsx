import KanbanBoard from "./pages/KanbanBoard";

const App = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    {/* Header */}
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-grow container mx-auto p-4">
      <KanbanBoard />
    </main>

    {/* Footer */}
    <footer className="bg-blue-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Kanban Board. Developed By Sukalyan Adhikary.</p>
      </div>
    </footer>
  </div>
);

export default App;
