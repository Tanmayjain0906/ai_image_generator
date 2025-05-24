import React from 'react'
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GenerateImageBtn from '../GenerateImageBtn';

const SeeTheMagic = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="see-the-magic"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        See the magic. Try now
      </motion.h2>

      <GenerateImageBtn />
    </motion.div>
  )
}

export default SeeTheMagic
