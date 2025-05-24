import React from 'react';
import "./style.css";
import { assets, testimonialsData } from '../../assets/assets';
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div className="testimonials"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>Customer Testimonials</h2>
        <p>What Our Users Are Saying</p>
      </motion.div>

      <div className="testimonial-cards">
        {
          testimonialsData.map((item, i) => (
            <motion.div
              className="testimonial"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src={item.image} alt="User" className='user-icon' />

              <div className='user-info'>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
              </div>

              <div className='rating-star'>
                {
                  [...Array(item.stars)].map((_, index) => (
                    <img key={index} src={assets.rating_star} alt='star' />
                  ))
                }
              </div>

              <p>{item.text}</p>
            </motion.div>
          ))
        }
      </div>
    </motion.div>
  )
}

export default Testimonials;
