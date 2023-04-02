import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";
import { FaChevronDown } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { addTodos } from "../store/todoSlice";

const InputForm = () => {
  const [value, setValue] = useState("");
  const [currentTodo, setCurrentTodo] = useState("");
  const [category, setCategory] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showError, setShowError] = useState(false);
  
  const dispatch = useDispatch();
  const todosItems = useSelector(state => state.todos.todosList);

  const options = [
    {
      _id: 1000,
      title: "Categories",
    },
    {
      _id: 1001,
      title: "Personal",
    },
    {
      _id: 1002,
      title: "Business",
    },
    {
      _id: 1003,
      title: "Others",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      showError && setShowError(false);
      showSuccess && setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showError, showSuccess]);

  const handleTodoAdd = (e) => {
    e.preventDefault();

    if (value === "") {
      setErrMessage("Please, write your Todo!");
      setShowError(true);
      setShowSuccess(false);
    } else if (category === "") {
      setErrMessage("Please, select a category!");
      setShowError(true);
      setShowSuccess(false);
    } else if (category === "Categories") {
      setErrMessage("Please, select a valid  category!");
      setShowError(true);
      setShowSuccess(false);
    } else {
      dispatch(
        addTodos({
          _id: Math.floor(Math.random() * 1000),
          todo: value,
          category: category,
        })
      );
      setCurrentTodo(value);
      setValue("");
      setShowError(false);
      setSuccessMessage(`"${value}" added in list`);
      setShowSuccess(true);
    }
  };

  return (
    <form className="w-[850px] bg-bodyColor p-6 flex flex-col gap-4 rounded-md">
      <div className="w-full bg-bodyColor flex items-center gap-4 h-10">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          placeholder="Enter your todo..."
          className="w-[80%] h-full bg-bodyColor border border-gray-400 py-2 px-4
                        placeholder:text-gray-400 text-white text-base placeholder:text-sm tracking-wide
                        rounded-md outline-none focus-visible:border-orange-600 hover:border-white"
        />
        <div className="w-[20%] h-full relative">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full text-center text-sm capitilize outline-none pr-4 bg-bodyColor
                             border border-gray-400 cursor-pointer appearance-none rounded-md
                             focus-visible:border-orange-600 hover:border-white"
          >
            {options.map((option) => {
              return <option key={option._id}>{option.title}</option>;
            })}
          </select>
          <span className="absolute right-3 top-3">
            <FaChevronDown />
          </span>
        </div>
      </div>
      <button
        onClick={handleTodoAdd}
        type="submit"
        className="w-full border border-gray-400 hover:border-gray-200 duration-300
                         font-titleFont font-semibold tracking-wider text-gray-400 hover:text-orange-600
                         h-10 uppercase rounded-md"
      >
        Add Todo
      </button>
      <div className="flex flex-col gap-4">
        <TodoList todosItems={todosItems} />
      </div>
      {showError && <ErrorMessage message={errMessage} />}
      {showSuccess && <SuccessMessage message={successMessage} />}
    </form>
  );
};

export default InputForm;
