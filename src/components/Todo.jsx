import { Circle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const Todo = () => {
  const Button = ({ label, className, onClick, type = "button", disabled }) => {
    return (
      <button
        type={type}
        className={`btn min-h-0 h-auto py-2 px-3 text-sm md:text-base ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };

  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {
      console.log("Erreur d'écriture dans le localStorage");
    }
  }, [todos]);

  function handleAddTodo() {
    const text = newTodo.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false },
    ]);
    setNewTodo("");
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleDelete(id) {
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function saveEdit() {
    const text = editingText.trim();
    if (!text) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text } : t))
    );
    setEditingId(null);
    setEditingText("");
  }

  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5 mt-4 sm:mt-5 bg-gray-600 rounded-2xl p-4 sm:p-5 shadow-lg mx-2 sm:mx-5 max-w-full">
        <ThemeToggle />
      <h2 className="text-xl sm:text-2xl font-bold text-center">Todo List React</h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-full sm:max-w-xl">
        <input
          type="text"
          className="input input-bordered w-full text-base"
          placeholder="Ajouter une tâche..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <Button
          className="bg-green-500 hover:bg-green-600 text-white font-bold"
          label="Ajouter"
          onClick={handleAddTodo}
        />
      </div>

      <div className="w-full sm:hidden">
        <div className="flex flex-col gap-3">
          {todos.map((todo) => {
            const isEditing = editingId === todo.id;
            return (
              <div
                key={todo.id}
                className="bg-gray-700 rounded-xl p-3 flex items-start gap-3"
              >
                <button
                  className="btn btn-ghost btn-sm min-h-0 h-auto p-1"
                  onClick={() => handleToggle(todo.id)}
                  title={todo.done ? "Marquer comme non fait" : "Marquer comme fait"}
                >
                  {todo.done ? <CheckCircle size={22} /> : <Circle size={22} />}
                </button>

                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      autoFocus
                      type="text"
                      className="input input-bordered w/full text-base"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      placeholder="Modifier la tâche..."
                    />
                  ) : (
                    <span
                      className={`block text-base break-words ${todo.done ? "line-through opacity-70" : ""}`}
                    >
                      {todo.text}
                    </span>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    {isEditing ? (
                      <>
                        <Button
                          label="Sauvegarder"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={saveEdit}
                          disabled={!editingText.trim()}
                        />
                        <Button
                          label="Annuler"
                          className="bg-gray-500 hover:bg-gray-600 text-white"
                          onClick={cancelEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          label="Modifier"
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          onClick={() => startEdit(todo)}
                        />
                        <Button
                          label="Supprimer"
                          className="bg-red-700 hover:bg-red-800 text-white"
                          onClick={() => handleDelete(todo.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {todos.length === 0 && (
            <div className="text-center text-sm opacity-80 py-2">
              Aucune tâche pour le moment. Ajoute-en une ci-dessus.
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:block overflow-x-auto w-full max-w-xl">
        <table className="table">
          <tbody>
            {todos.map((todo) => {
              const isEditing = editingId === todo.id;
              return (
                <tr key={todo.id}>
                  <th
                    className="text-xl cursor-pointer"
                    onClick={() => handleToggle(todo.id)}
                    title={todo.done ? "Marquer comme non fait" : "Marquer comme fait"}
                  >
                    {todo.done ? <CheckCircle /> : <Circle />}
                  </th>

                  <td className="text-lg align-middle max-w-xs">
                    {isEditing ? (
                      <input
                        autoFocus
                        type="text"
                        className="input input-bordered w-full"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        placeholder="Modifier la tâche..."
                      />
                    ) : (
                      <span
                        className={`whitespace-normal break-words ${todo.done ? "line-through opacity-70" : ""}`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </td>

                  <td className="align-middle">
                    {isEditing ? (
                      <Button
                        label="Sauvegarder"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-xl"
                        onClick={saveEdit}
                        disabled={!editingText.trim()}
                      />
                    ) : (
                      <Button
                        label="Modifier"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-base md:text-xl"
                        onClick={() => startEdit(todo)}
                      />
                    )}
                  </td>

                  <td className="align-middle">
                    {isEditing ? (
                      <Button
                        label="Annuler"
                        className="bg-gray-500 hover:bg-gray-600 text-white text-base md:text-xl"
                        onClick={cancelEdit}
                      />
                    ) : (
                      <Button
                        label="Supprimer"
                        className="bg-red-700 hover:bg-red-800 text-white text-base md:text-xl"
                        onClick={() => handleDelete(todo.id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}

            {todos.length === 0 && (
              <tr>
                <td className="text-center text-base opacity-80" colSpan={4}>
                  Aucune tâche pour le moment. Ajoute-en une ci-dessus.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
