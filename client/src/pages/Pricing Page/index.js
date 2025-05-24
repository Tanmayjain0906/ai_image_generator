import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { assets, plans } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

const PricingPage = () => {
     const[isLoading, setIsLoading] = useState(false);

    const { user, isUserLoading, loadData, backendUrl } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoading) {
          if (!user) {
            toast.error("Please Login or Signup First");
            navigate("/");
          }
        }
      }, [user, isUserLoading]);

      async function initPay(order)
      {
        const options = {
            key: "rzp_test_8pkAwIcWg6Lqbx",
            amount: order.amount,
            currency: order.currency,
            name: "Credits Payment",
            description: "Credits Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                setIsLoading(true);
                try {
                    const {data} = await axios.post(`${backendUrl}/transaction/verify-razor`, {razorpay_order_id: response.razorpay_order_id});
                    if(data.success)
                    {
                        navigate("/");
                        loadData();
                        toast.success(data.message);
                    }
                } catch (error) {
                    toast.error(error.message || error.error)
                }
                setIsLoading(false);
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
      }

      async function initiatePayment(planId)
      {
        try {
            const {data} = await axios.post(`${backendUrl}/transaction/pay-razor`, {planId}, {headers: {token: localStorage.getItem("token")}});
            console.log(data);
            
            if(data.success)
            {
                initPay(data.order);
            }
            else
            {
               toast.error(data.message || data.error) 
            }
        } catch (error) {
            toast.error(error.message || error.error)
        }
        
      }

      if(isLoading)
      {
        return(
            <Loader />
        )
      }

    return (
        <motion.div 
            className="pricing-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.button 
                className="plans-button"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                OUR PLANS
            </motion.button>

            <motion.h2 
                className="pricing-heading"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Choose the plan
            </motion.h2>

            <motion.div 
                className="plans-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        className={`plan-card ${plan.name === "Advanced" ? "highlight-card" : ""}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                    >
                        <div className="plan-header">
                            <img src={assets.logo_icon} alt="icon" className="plan-icon" />
                            <h3 className="plan-title">{plan.name}</h3>
                            <p className="plan-description">{plan.description}</p>
                        </div>
                        <div className="plan-pricing">
                            <p className="plan-price">{plan.price}</p>
                            <p className="plan-credits">/ {plan.credits}</p>
                        </div>
                        <button className="get-started-button" onClick={() => initiatePayment(plan.name)}>
                            {user ? "Purchase" : "Get Started"}
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default PricingPage;
