import React from 'react'
import "./style.css";
import { stepsData } from '../../assets/assets';
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div className="how-it-works"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        How it works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Transform Words Into Stunning Images
      </motion.p>

      <div className="steps">
        {
          stepsData.map((item, i) => (
            <motion.div
              className='step'
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
            >
              <img src={item.icon} alt='icon' className='step-icon' />
              <div className='step-text'>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default Steps
