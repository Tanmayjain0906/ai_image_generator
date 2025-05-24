import React from 'react'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'
import "./style.css";

const Description = () => {
  return (
    <motion.div className="create-ai"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div className='top-content'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>Create AI Images</h2>
        <p>Turn your imagination into visuals</p>
      </motion.div>

      <motion.div className="ai-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.img
          src={assets.sample_img_1}
          alt="AI Example"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3>Introducing the AI-Powered Text to Image Generator</h3>
          <p>Easily bring your ideas to life. From product visuals to portraits, describe it and watch it come alive instantly.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Description
