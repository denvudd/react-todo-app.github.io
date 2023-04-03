import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSingleTodos } from "../store/todoSlice";

import { MdDelete, MdBusinessCenter } from "react-icons/md";
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs";
import { VscEllipsis } from "react-icons/vsc";

import { AnimatePresence, motion } from "framer-motion";

const TodoList = ({ todosItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const dispatch = useDispatch();

  const motionInit = { y: 10, opacity: 0 };
  const motionAnimate = { y: 0, opacity: 1 };
  const motionTransition = { y: { type: "spring", stiffness: 120 } };
  const motionExit = { x: -10, opacity: 0 };

  const handleItemClick = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleExpandClick = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  return (
    <ul className="w-full grid grid-cols-1 gap-4 my-2 rounded-sm p-4">
      {todosItems.length > 0 && (
          <AnimatePresence>
            {todosItems.map((todo) => {
              const isSelected = selectedItems.includes(todo._id);
              const isExpanded = expandedItems.includes(todo._id);
              return (
                <motion.li
                  onClick={() => handleItemClick(todo._id)}
                  key={todo._id}
                  initial={motionInit}
                  animate={motionAnimate}
                  exit={motionExit}
                  transition={motionTransition}
                  className={`${
                    isSelected
                      ? "border-l-orange-500 border-orange-900"
                      : "border-l-green-500 border-green-900"
                  } w-full font-titleFont font-medium text-base border border-l-[6px] rounded-sm
                    px-2 py-2 cursor-pointer flex items-center justify-between flex-wrap`}
                >
                  <div className="flex items-center">
                    <div className={`${todo.important ? "text-red-500" : "text-white"}`}>
                      {todo.todo}
                    </div>
                    {todo.category === "Personal" && (
                      <span className="text-md text-gray-400 ml-2">
                        <BsFillPersonFill />
                      </span>
                    )}
                    {todo.category === "Business" && (
                      <span className="text-md text-gray-400 ml-2">
                        <MdBusinessCenter />
                      </span>
                    )}
                    {todo.category === "Others" && (
                      <span className="text-md text-gray-400 ml-2">
                        <VscEllipsis />
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <span
                      onClick={() => handleExpandClick(todo._id)}
                      className={`text-xl text-gray-300 hover:text-gray-500 duration-300 cursor-pointer ${
                        todo.descr.length === 0 && "hidden"
                      }`}
                    >
                      <BsFillCaretDownFill />
                    </span>
                    <span
                      onClick={() => dispatch(deleteSingleTodos(todo._id))}
                      className="text-xl text-gray-300 hover:text-red-500 duration-300 cursor-pointer"
                    >
                      <MdDelete />
                    </span>
                  </div>
                  {isExpanded && todo.descr.length > 0 && (
                    <motion.div
                      className="w-full mt-2 text-gray-500 text-sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="whitespace-pre-wrap">{todo.descr}</p>
                    </motion.div>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
      )}
      
    </ul>
  );
};

export default TodoList;
