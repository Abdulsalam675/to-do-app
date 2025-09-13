import { useState } from "react";
import "./App.css";
import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "./component/modal";
import Switch from "./component/toggleButton";
import useLocalStorage from "use-local-storage";

function App() {
  const [addItems, setAddItems] = useLocalStorage("addItems", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  function handleAddItem(newItem) {
    setAddItems((addItem) => [...addItem, newItem]);
  }

  function handleCheckedItem(id) {
    setAddItems((addItems) =>
      addItems.map((items) =>
        items.id === id ? { ...items, checked: !items.checked } : items
      )
    );
  }

  function handleDeleteItem(id) {
    setAddItems((addItems) => addItems.filter((items) => items.id !== id));
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleClearList(callBack) {
    if (callBack) {
      setAddItems([]);
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
    }
  }

  function handleChange() {
    setIsDark(!isDark);
  }

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Form
        onAddItems={handleAddItem}
        onOpen={handleOpenModal}
        isDark={handleChange}
        isChecked={isDark}
      />
      <TaskList
        addItems={addItems}
        onChecked={handleCheckedItem}
        onDelete={handleDeleteItem}
      />

      <Modal isOpen={isModalOpen} callBack={handleClearList} isDark={isDark} />
    </div>
  );
}

function Form({ onAddItems, onOpen, isDark, isChecked }) {
  const [item, setItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (item.trim() === "") return;
    const newItem = { title: item, checked: false, id: Date.now() };
    onAddItems(newItem);
    setItem("");
  }

  return (
    <div>
      <form className="fixed-form" onSubmit={handleSubmit}>
        <div className="header">
          <h1>To-do</h1>
          <div className="toggle-btn">
            <Switch onChange={isDark} isChecked={isChecked} />
          </div>
        </div>
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Add a new task"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="btn-group">
            <button className="add-btn">Add</button>
            <button
              type="button"
              className="clear-btn"
              onClick={() => onOpen(true)}
            >
              Clear task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function TaskList({ addItems, onChecked, onDelete }) {
  return (
    <>
      <div className="todo-container">
        <div className="task-group">
          <ul className="task-list">
            {addItems.map((item) => (
              <li key={item.id} className="task-item">
                <div className="title-checkbox-wrapper">
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => onChecked(item.id)}
                    />
                    <span class="custom-checkbox"></span>
                  </label>
                  <span
                    style={{
                      textDecoration: item.checked ? "line-through" : "",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete(item.id)}
                >
                  <HiOutlineTrash size={20} color="#d32f2f" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default App;
