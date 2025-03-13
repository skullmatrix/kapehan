import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import "../css/ordertype.css";

const OrderType = () => {
  const navigate = useNavigate();
  const [direction, setDirection] = useState<number>(0);

  const handleClick = (type: string) => {
    setDirection(type === "for-here" ? -1 : 1);
    setTimeout(() => {
      navigate(`/menu?orderType=${type}`);
    }, 300);
  };

  return (
    <motion.div 
      className="ordertype-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: direction * -1000 }} // Slide animation
    >
      <h2 className="ordertype-title">Choose Order Type</h2>
      <div className="ordertype-buttons">
        <motion.button
          className="ordertype-button"
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick("for-here")}
        >
          <img src={require("../media/icons/for-here.png")} alt="For Here" className="ordertype-icon" />
          <span className="ordertype-text">For Here</span>
        </motion.button>

        <motion.button
          className="ordertype-button"
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick("to-go")}
        >
          <img src={require("../media/icons/to-go.png")} alt="To Go" className="ordertype-icon" />
          <span className="ordertype-text">To Go</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OrderType;
