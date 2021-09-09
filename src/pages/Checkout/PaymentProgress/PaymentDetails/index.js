import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form, Button, Input, Accordion, Radio, Icon
} from 'semantic-ui-react';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { cartActions } from '../../../../store/cart';
import { notification } from 'antd';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from './utils';
import PayPal from './PayPal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function PaymentDetails() {
    const [values, setValues] = useState({
        cardNumber: '',
        cardName: '',
        expDate: '',
        cardCode: '',
    })
    const [focus, setFocus] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [gamesOrdered, setGamesOrdered] = useState([]);
    const userValues = useSelector(state => state.cart.userInfoPaymentDetails);
    const totalDiscountPrice = useSelector(state => state.cart.totalDiscountPrice);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        ref.current.focus();
        let tempGames = [];
        for (let game of cartGames) {
            const tmpGm = {
                game: {
                    id: game.game.id,
                    name: game.game.name,
                },
                gameQuantity: game.gameQuantity,
                totalPrice: totalDiscountPrice === 0 ? game.totalPrice : totalDiscountPrice,
            }
            tempGames.push(tmpGm)
        }
        setGamesOrdered(tempGames)
    }, []);

    const ref = useRef(null);

    const inputChangeHandler = (val) => (event) => {
        if (val === 'cardNumber') {
            setValues({ ...values, [val]: formatCreditCardNumber(event.target.value) })
        } else if (val === 'cardName') {
            setValues({ ...values, [val]: (event.target.value).toUpperCase() })
        } else if (val === 'expDate') {
            setValues({ ...values, [val]: formatExpirationDate(event.target.value) })
        } else if (val === 'cardCode') {
            setValues({ ...values, [val]: formatCVC(event.target.value) })
        }
    }

    const onBackPaymentStepHandler = () => {
        dispatch(cartActions.setActivePaymentOptionBack());
    }
    const finishPaymentHandler = () => {

        axios.post(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/paymentDetails.json`, { paymentDetails: values, userDetails: userValues, gameDetails: gamesOrdered })
            .then(() => {
                axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
                    .then(res => {
                        for (let key in res.data) {
                            for (let gm of gamesOrdered) {
                                if (gm.game.id === key) {
                                    res.data[key].quantity = res.data[key].quantity - gm.gameQuantity;
                                    axios.put(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games/${key}.json`, res.data[key])
                                        .then(() => {
                                        })
                                        .catch(err => {
                                            console.error(err);
                                        })
                                }
                            }
                        }
                    })
                notification.open({
                    message: 'Payment Successful',
                    icon: <Icon name='check circle outline' style={{ color: '#ffc107' }} />,
                });

                dispatch(cartActions.paymentCompleted());
                history.push('/');
            })
            .catch(err => {
                notification.open({
                    message: 'Payment Failed',
                    icon: <Icon name='exclamation' style={{ color: 'red' }} />,
                });
                console.error(err);
            })
    }

    const isDisabled = (!values.cardNumber ||
        !values.cardName ||
        !values.expDate || !values.cardCode);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;

        setActiveIndex(newIndex)
    }
    return (
        <div>
            <Accordion fluid styled>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}
                >
                    <Radio checked={activeIndex === 0 ? true : false} style={{ marginRight: 15 }} />
                    Credit Card
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0} style={{ backgroundColor: '#fafafa' }}>
                    <div clasName="rccs__card rccs__card--unknown">
                        <Cards
                            number={values.cardNumber}
                            name={values.cardName}
                            expiry={values.expDate}
                            cvc={values.cardCode}
                            focused={focus}
                        />
                    </div>

                    <Form style={{ marginTop: 10 }}>
                        <Input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            value={values.cardNumber}
                            onChange={inputChangeHandler('cardNumber')}
                            onFocus={(e) => setFocus(e.target.name)}
                            ref={ref}
                            style={{ width: '100%' }}
                        />
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={values.cardName}
                            onChange={inputChangeHandler('cardName')}
                            onFocus={(e) => setFocus(e.target.name)}
                            style={{ width: '100%', marginTop: 10 }}
                        />
                        <Form.Group widths='equal' style={{ width: '100%', marginTop: 10, marginLeft: 0 }}>
                            <Input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={values.expDate}
                                onChange={inputChangeHandler('expDate')}
                                onFocus={(e) => setFocus(e.target.name)}
                                style={{ width: '50%', paddingRight: 5 }}
                            />
                            <Input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                value={values.cardCode}
                                onChange={inputChangeHandler('cardCode')}
                                onFocus={(e) => setFocus(e.target.name)}
                                style={{ width: '50%', paddingLeft: 5 }}
                            />
                        </Form.Group>

                    </Form>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleClick}
                >
                    <Radio checked={activeIndex === 1 ? true : false} style={{ marginRight: 15 }} />
                    PayPal
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <PayPal />
                </Accordion.Content>
            </Accordion>
            <Form style={{ marginTop: 20 }}>
                <Button content='Back' icon='left arrow' labelPosition='left' secondary onClick={onBackPaymentStepHandler} />
                <Button content='Pay now' secondary onClick={finishPaymentHandler} disabled={cartGames.length === 0 ? true : isDisabled} />
            </Form>
        </div >
    )
}

export default PaymentDetails;