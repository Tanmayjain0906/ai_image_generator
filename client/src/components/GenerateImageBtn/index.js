import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";
import "./style.css";

const GenerateImageBtn = () => {
const {user , setIsModalShow} = useContext(AppContext);

  const navigate = useNavigate();

  function handleGenerateButton()
  {
    if(user)
    {
      navigate("/result");
      return;
    }
    setIsModalShow(true);
  }

  return (
    <motion.button className="cta generate-btn" onClick={handleGenerateButton}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        viewport={{once: true}}
      >
        Generate Images ✨
      </motion.button>
  )
}

export default GenerateImageBtn