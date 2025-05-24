import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css";

import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';

const Navbar = () => {

    const { user, setUser, setIsModalShow, credit, setCredit, setIsUserLoading } = useContext(AppContext);
    const [showLogout, setShowLogout] = useState(false);

    const navigate = useNavigate();


    function handleLogoutButton() {
        if (setShowLogout) {
            setTimeout(() => {
                setShowLogout(false);
            }, 2000)
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        setCredit(null);
        setIsUserLoading(true);
        navigate("/");
    }

    return (
        <div className="navbar">
            <img src={assets.logo} alt='Logo' id='logo' onClick={() => navigate("/")} />
            {
                user ?

                    <div className="user-container">
                        <div className="credits-button" onClick={() => navigate("/pricing")}>
                            <img src={assets.credit_star} alt='Star' width="15px" /> Credits left: {credit}
                        </div>
                        <p className="username">Hi, {user}</p>
                        <img src={assets.profile_icon} alt="User" className="user-icon" onMouseEnter={() => setShowLogout(true)} onMouseLeave={handleLogoutButton} />
                        {showLogout && (
                            <button className="user-logout-btn" onClick={logout}>
                                Logout
                            </button>
                        )}
                    </div>

                    :
                    <nav>
                        <p onClick={() => navigate("/pricing")}>Pricing</p>
                        <button className="login-btn" onClick={() => setIsModalShow(true)}>Login</button>
                    </nav>
            }

        </div>
    )
}

export default Navbar