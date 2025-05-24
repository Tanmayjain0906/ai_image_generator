import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isModalShow, setIsModalShow] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [credit, setCredit] = useState(null);

    const backendUrl = "https://ai-image-generator-oglu.onrender.com";

    async function loadData() {
        setIsUserLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/user/credit-balance`, { headers: { token: localStorage.getItem("token") } });

            if (data.success) {
                setCredit(data.data.creditBalance);
                setUser(data.data.name);
            }
            else {
                toast.error(data.message || data.error)
                setCredit(null);
                setUser(null);
            }

        } catch (error) {
            toast.error(error.message || error.error)
            setCredit(null);
            setUser(null);
        }
        setIsUserLoading(false);
    }

    useEffect(() => {

        if (localStorage.getItem("token")) {
            loadData()
        }
        else
        {
            setIsUserLoading(false);
        }
    }, [])

    return (
        <AppContext.Provider value={{ user, setUser, isModalShow, setIsModalShow, credit, setCredit, isUserLoading, setIsUserLoading, loadData, backendUrl }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;