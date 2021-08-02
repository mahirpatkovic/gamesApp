import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { notification } from 'antd';
import { cartActions } from "../../../../../store/cart";
import { useHistory } from "react-router-dom";
import axios from "axios";

function PayPal() {
    const paypal = useRef();
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const totalDiscountPrice = useSelector(state => state.cart.totalDiscountPrice);
    const user = useSelector(state => state.cart.userInfoPaymentDetails);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let orderedGames = [];
        for (let game of cartGames) {
            const tmpGm = {
                game: {
                    id: game.game.id,
                    name: game.game.name,
                },
                gameQuantity: game.gameQuantity,
                totalPrice: totalDiscountPrice === 0 ? game.totalPrice : totalDiscountPrice,
            }
            orderedGames.push(tmpGm)
        }
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Games ordered",
                                amount: {
                                    currency_code: "USD",
                                    value: totalDiscountPrice === 0 ? totalPrice + 3.50 : totalDiscountPrice + 3.50,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    axios.post(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/paymentDetails.json`, { paypalDetails: order.purchase_units, userDetails: user, gameDetails: orderedGames })
                        .then(() => {
                            notification.open({
                                message: 'Payment Successful',
                                icon: <Icon name='check circle outline' style={{ color: '#ffc107' }} />,
                            });
                            dispatch(cartActions.paymentCompleted());
                            history.push('/');
                            localStorage.removeItem('__paypal_storage__');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                    notification.open({
                        message: 'Payment Failed',
                        icon: <Icon name='exclamation' style={{ color: 'red' }} />,
                    });
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default PayPal;