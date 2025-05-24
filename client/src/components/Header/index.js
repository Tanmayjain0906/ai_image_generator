import React from 'react'
import "./style.css";
import { assets } from '../../assets/assets';
import { motion } from "framer-motion";
import GenerateImageBtn from '../GenerateImageBtn';

const Header = () => {
  

  return (
    <motion.div className="hero"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.span className="tag"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        Best text to image generator ⭐
      </motion.span>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
      >
        Turn text to <span className="highlight">image</span>, in seconds.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
      >
        Unleash your creativity with AI. Just type, and watch the magic happen.
      </motion.p>

      <GenerateImageBtn />

      <motion.div className="image-gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.img
            key={i}
            src={i % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
            alt="Generated AI"
            width="100px"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Header;
