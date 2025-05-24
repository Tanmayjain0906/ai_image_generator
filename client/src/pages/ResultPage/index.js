import React, { useState, useRef, useEffect, useContext } from 'react';
import './style.css';
import { assets } from "../../assets/assets";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AppContext } from "../../context/AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImagifyUI = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [progress, setProgress] = useState(0);

  const { credit, setCredit, user, isUserLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    if (credit <= 0) {
      toast.error("Insufficient Credit Balance");
      navigate("/pricing");
      return;
    }

    try {
      setIsLoading(true);
      setProgress(0);
      setIsImageGenerated(false);

      // Simulated progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 10) + 5;
        if (currentProgress >= 90) {
          clearInterval(interval);
          currentProgress = 90;
        }
        setProgress(currentProgress);
      }, 300);

      const { data } = await axios.post(
        "/image/generate-image",
        { prompt: input },
        { headers: { token: localStorage.getItem("token") } }
      );

      clearInterval(interval);
      setProgress(100);

      if (data.success) {
        setImage(data.image);
        setCredit(data.data.creditBalance);
        setIsImageGenerated(true);
      }
    } catch (error) {
      toast.error(error.message || error.error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [input]);

  useEffect(() => {
    console.log(user);
    if (!isUserLoading) {
      if (!user) {
        toast.error("Please Login or Signup First");
        navigate("/");
      }
    }
  }, [user, isUserLoading]);
  return (
    <motion.div
      className="imagify-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="imagify-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className={`image-wrapper ${isLoading ? 'loading' : ''}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img src={image} alt="Generated" />
          {isLoading && (
            <div className="loading-overlay">
              <div className="shimmer"></div>
              <p className="progress-text">Generating... {progress}%</p>
            </div>
          )}
        </motion.div>

        {isImageGenerated ? (
          <motion.div
            className="action-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button
              className='generate-another-btn'
              onClick={() => setIsImageGenerated(false)}
            >
              Generate Another
            </button>
            <a href={image} className='download-btn' download>
              Download
            </a>
          </motion.div>
        ) : (
          <motion.div
            className="input-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Describe what you want to generate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <button onClick={handleGenerate}>Generate</button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImagifyUI;
