import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todolist, seTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value;

    if (inputText === "") {
      return null;
    }

    // this is for new new id
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    seTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const deleteTodo = (id) => {
    seTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };
  // this is for the toggle of text
  const toggle = (id) => {
    seTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    // to save the data in local storage

    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      {/* input  box */}
      <div className=" flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6  pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your text"
        />
        <button
          onClick={add}
          className="  bg-orange-600  cursor-pointer pl-3 pr-3 p-0.3 rounded-full h-14  w-30"
        >
          ADD +
        </button>
      </div>
      {/* Todo items */}
      <div>
        {todolist.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
