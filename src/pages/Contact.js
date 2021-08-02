import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from "../components/Loader";
function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector(state => state.cart.addedGamesToCart)
    useEffect(() => {
        let startTime = new Date().getTime();
        let interval = setInterval(() => {
            setIsLoading(true);
            if (new Date().getTime() - startTime > 1000) {
                setIsLoading(false);
                clearInterval(interval);
                return;
            }
        }, 0);
        console.log(cart)
    }, [cart]);
    return (
        <div style={{display: 'flex'}}>
            {isLoading ? <Loader /> : <p> Contact Page</p>}
        </div >
    )
}

export default Contact;