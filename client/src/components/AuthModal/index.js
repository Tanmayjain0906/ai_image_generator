import React, { useState, useRef, useEffect, useContext } from 'react';
import './style.css';
import { assets } from '../../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import Loader from '../Loader';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const modalRef = useRef();
    const { setCredit, setUser } = useContext(AppContext);

    async function handleForm(e) {
        e.preventDefault();
        if (isLogin) {

            if (!email || !password) {
                toast.error("Fill all feild first!");
                return;
            }
            setIsLoading(true);
            try {
                const { data } = await axios.post("/user/login", { email, password });
                console.log(data);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setCredit(data.data.creditBalance);
                    setUser(data.data.name);
                }
                else {
                    toast.error(data.message || data.error);
                    setUser(null);
                }
            } catch (error) {
                toast.error(error.message || error.error);
            }
        }
        else {
            if (!name, !email, !password, !cPassword) {
                toast.error("Fill all feild first!");
                return;
            }


            if (password !== cPassword) {
                toast.error("Passwords do not match.");
                return;
            }
            setIsLoading(true);
            try {
                const { data } = await axios.post("/user/registration", { name, email, password });

                console.log(data);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setCredit(data.data.creditBalance);
                    setUser(data.data.name);
                }
                else {
                    toast.error(data.message || data.error);
                    setUser(null);
                }
            } catch (error) {
                toast.error(error.message || error.error);
            }
        }

        setIsLoading(false);
        onClose();
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    }, []);

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="auth-overlay">
            <AnimatePresence>
                <motion.div
                    className="auth-modal"
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                >
                    <button className="auth-close-btn" onClick={onClose}>
                        <img src={assets.cross_icon} alt='cross' />
                    </button>
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <p>{isLogin ? 'Welcome back! Please sign in to continue' : 'Create your account to get started'}</p>

                    <form onSubmit={handleForm}>
                        {!isLogin && (
                            <div className='form-input-bar'>
                                <img src={assets.user_icon} alt='profile' id='profile-icon' />
                                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        )}
                        <div className='form-input-bar'>
                            <img src={assets.email_icon} alt='email' />
                            <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='form-input-bar'>
                            <img src={assets.lock_icon} alt='password' />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {
                            !isLogin && <div className='form-input-bar'>
                                <img src={assets.lock_icon} alt='password' />
                                <input type="password" placeholder="Confirm Password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                            </div>
                        }

                        {isLogin && (
                            <a href="#" className="auth-forgot">Forgot password?</a>
                        )}
                        <button type="submit" className="auth-submit-btn">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        {isLogin
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <span onClick={toggleForm}>{isLogin ? 'Sign up' : 'Login'}</span>
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AuthModal;
