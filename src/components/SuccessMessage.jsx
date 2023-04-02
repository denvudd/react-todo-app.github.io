import { motion } from "framer-motion";
import { MdOutlineDone } from "react-icons/md";

const SuccessMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { type: "string", stiffness: 120 },
      }}
      className="border-b-green-500 text-green-500 absolute font-titleFont 
      tracking-wide font-medium text-md top-4 right-3 bg-bodyColor px-10 py-4 
      rounded-sm border-b-[6px]"
    >
      <p className="flex items-center gap-4">
        <span className="text-xl">
          <MdOutlineDone />
        </span>{" "}
        {message}
      </p>
    </motion.div>
  );
};

export default SuccessMessage;
