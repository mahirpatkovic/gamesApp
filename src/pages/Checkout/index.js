import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader";
import './style.css';
import PaymentProgress from './PaymentProgress';

function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);

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
        console.log("Checkout page", cartGames)
    }, [cartGames]);
    return (
        <div style={{ display: 'flex' }}>
            {isLoading ? <Loader /> : <div className="checkoutPage">
                <PaymentProgress />
            </div>}
        </div >
    )
}

export default Checkout;