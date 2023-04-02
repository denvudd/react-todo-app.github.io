import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodos } from "../store/todoSlice";

import { MdDelete, MdBusinessCenter } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { VscEllipsis } from "react-icons/vsc";

import { AnimatePresence, motion } from "framer-motion";

const TodoList = ({ todosItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
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

  return (
    <ul className="grid grid-cols-1 gap-4 shadow-todoShadow mt-6 rounded-sm p-4">
      <AnimatePresence>
        {todosItems.map((todo) => {
          const isSelected = selectedItems.includes(todo._id);
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
              px-2 py-2 cursor-pointer flex items-center justify-between`}
            >
              <div className="flex items-center">
                {todo.todo}
                {todo.category === "Personal" && (
                  <span className="text-md text-gray-400 hover:text-red-500 duration-300 cursor-pointer ml-2">
                    <BsFillPersonFill />
                  </span>
                )}
                {todo.category === "Business" && (
                  <span className="text-md text-gray-400 hover:text-red-500 duration-300 cursor-pointer ml-2">
                    <MdBusinessCenter />
                  </span>
                )}
                {todo.category === "Others" && (
                  <span className="text-md text-gray-400 hover:text-red-500 duration-300 cursor-pointer ml-2">
                    <VscEllipsis />
                  </span>
                )}
              </div>
              <span
                onClick={() => dispatch(deleteTodos(todo._id))}
                className="text-xl text-gray-300 hover:text-red-500 duration-300 cursor-pointer"
              >
                <MdDelete />
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
