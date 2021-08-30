import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Grid, Form, Button,
    Image, Header, Divider, Step, Icon
} from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';

import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { cartActions } from '../../../store/cart';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import UserInfoDetails from './UserInfoDetails';
import ShippingDetails from './ShippingDetails';
import PaymentDetails from './PaymentDetails';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function PaymentProgress() {

    const [discountCodes, setDiscountCodes] = useState([]);
    const [enteredCode, setEneteredCode] = useState('');
    const [isDiscountAppliedAlertVisible, setIsDiscountAppliedAlertVisible] = useState(false);
    const [isDiscountDeniedAlertVisible, setIsDicountDeniedAlertVisible] = useState(false);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [discountCodeDbIds, setDiscountCodeDbIds] = useState([]);

    const cartGames = useSelector(state => state.cart.addedGamesToCart);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const totalDiscountPrice = useSelector(state => state.cart.totalDiscountPrice);
    const activeStep = useSelector(state => state.cart.activePaymentStep);
    const isTabletOrMobile = useMediaQuery({
        query: '(max-device-width: 991px)'
    });
    
    const shippingPrice = 3.50;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDiscountCodesOptions = () => {
            axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/discountCodes.json`)
                .then(res => {
                    let tmpCodes = [];
                    let tmpCodeIds = [];
                    for (let key in res.data) {
                        tmpCodes.push(res.data[key]);
                        tmpCodeIds.push(key);
                    }
                    setDiscountCodes(tmpCodes);
                    setDiscountCodeDbIds(tmpCodeIds);
                })
                .catch(err => {
                    console.error(err);
                })
        }

        fetchDiscountCodesOptions();
    }, []);

    const paymentSteps = [
        {
            id: 0,
            title: 'Info',
            description: 'Shipping details',
            icon: 'info circle',
        },
        {
            id: 1,
            title: 'Shipping',
            description: 'Check shipping details',
            icon: 'plane',
        },
        {
            id: 2,
            title: 'Payment',
            description: 'Verify payment details',
            icon: 'dollar',
        },
    ]


    const onApplyDiscountCodeChangeHandler = (event) => {
        setEneteredCode(event.target.value);
    }

    const applyDiscountCodeChangeHandler = () => {
        const newCodeIndex = discountCodes.findIndex(code => code.codeId === enteredCode);
        if (newCodeIndex === -1) {
            setEneteredCode('');
            setIsDicountDeniedAlertVisible(true);
        } else {
            setIsDiscountApplied(true);
            dispatch(cartActions.discountHandler());
            setIsDiscountAppliedAlertVisible(true);
            setEneteredCode('');
            axios.delete(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/discountCodes/${discountCodeDbIds[newCodeIndex]}.json`, { codeId: enteredCode })
                .then(() => {
                    discountCodes.splice(newCodeIndex, 1);
                    discountCodeDbIds.splice(newCodeIndex, 1);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    const activePaymentStepHandler = (step) => {
        switch (step) {
            case 0:
                return <UserInfoDetails />
            case 1:
                return <ShippingDetails />
            case 2:
                return <PaymentDetails />
            default:
                return <UserInfoDetails />
        }
    }
    return (
        <div>
            {isDiscountDeniedAlertVisible && <Snackbar
                open={isDiscountDeniedAlertVisible}
                autoHideDuration={3000}
                onClose={() => setIsDicountDeniedAlertVisible(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setIsDicountDeniedAlertVisible(false)}
                    severity="warning"
                    style={{ marginTop: 50, backgroundColor: 'black' }}
                >
                    Discount code invalid!
                    <p>Please enter correct discount code</p>
                </Alert>
            </Snackbar>}
            {isDiscountAppliedAlertVisible && <Snackbar
                open={isDiscountAppliedAlertVisible}
                autoHideDuration={3000}
                onClose={() => setIsDiscountAppliedAlertVisible(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setIsDiscountAppliedAlertVisible(false)}
                    severity="success"
                    style={{ marginTop: 50, backgroundColor: 'black' }}
                >
                    Discount code accepted!
                    <p>Applied discount 20%</p>
                </Alert>
            </Snackbar>}
            <Grid columns='equal' divided={isTabletOrMobile ? false : true} >
                {!isTabletOrMobile && <Step.Group widths={3}>
                    {paymentSteps.map(step => <Step key={step.id} active={activeStep === step.id ? true : false}>
                        <Icon name={step.icon} />
                        <Step.Content>
                            <Step.Title>{step.title}</Step.Title>
                            <Step.Description>{step.description}</Step.Description>
                        </Step.Content>
                    </Step>)}
                </Step.Group>}
                <Grid.Row columns='equal'>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                        {activePaymentStepHandler(activeStep)}
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8} style={{marginTop: isTabletOrMobile ? 10 : 0}}>
                        <Grid columns={4}>
                            <Grid.Row style={{ marginLeft: 10, marginTop: -15 }}>
                                <Divider horizontal style={{ width: '100%' }}>
                                    <Header>
                                        <ShoppingCartIcon /> Shopping cart
                                    </Header>
                                </Divider>
                            </Grid.Row>
                            {cartGames.length > 0 ? cartGames.map(gm => <Grid.Column key={gm.game.id}>
                                <Badge badgeContent={gm.gameQuantity} color="secondary">
                                    <Image src={gm.game.poster} style={{ borderRadius: 5 }} />
                                </Badge>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {gm.game.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {gm.totalPrice.toFixed(2)} $
                                </Typography>
                            </Grid.Column>) : <Typography variant="subtitle1" color="textSecondary">
                                <ShoppingCartIcon /> Cart is empty
                            </Typography>}
                            <Divider style={{ width: '100%', marginLeft: 10 }} />
                            <Form style={{ width: '100%' }}>
                                <Form.Group widths='equal'>
                                    <Form.Input placeholder='Gift or discount code'
                                        value={enteredCode}
                                        onChange={onApplyDiscountCodeChangeHandler} />
                                    <Button type='submit'
                                        onClick={applyDiscountCodeChangeHandler}
                                        disabled={(enteredCode === '' || cartGames.length === 0) ? true : false}
                                        style={{ marginLeft: isTabletOrMobile ? 7 : 0, marginBottom: isTabletOrMobile ? 10 : 0 }}
                                    >Apply</Button>
                                </Form.Group>
                            </Form>
                            <Grid.Row style={{ marginLeft: 10, marginTop: -20 }}>
                                <Grid.Column floated='left' width={3}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Subtotal
                                    </Typography>
                                </Grid.Column>
                                <Grid.Column floated='right' width={4}>
                                    <Typography variant="subtitle1" color="textPrimary" style={{ textAlign: 'right' }}>
                                        {isDiscountApplied ? <del>{totalPrice.toFixed(2)} $</del> : `${totalPrice.toFixed(2)} $`}
                                    </Typography>
                                    {isDiscountApplied && <Typography variant="subtitle1" color="textPrimary" style={{ textAlign: 'right' }}>
                                        {totalDiscountPrice.toFixed(2)} $
                                    </Typography>}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ marginLeft: 10, marginTop: -20 }}>
                                <Grid.Column floated='left' width={3}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Shipping
                                    </Typography>
                                </Grid.Column>
                                <Grid.Column floated='right' width={4}>
                                    <Typography variant="subtitle1" color="textPrimary" style={{ textAlign: 'right' }}>
                                        {shippingPrice.toFixed(2)} $
                                    </Typography>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider style={{ width: '80%', marginLeft: 10 }} />
                            <Grid.Row style={{ marginLeft: 10, marginTop: -20 }}>
                                <Grid.Column floated='left' width={3}>
                                    <Typography variant="h6" color="textSecondary">
                                        Total
                                    </Typography>
                                </Grid.Column>
                                <Grid.Column floated='right' width={5}>
                                    <Typography variant="h5" color="textPrimary" style={{ textAlign: 'right' }}>
                                        {isDiscountApplied ? `${(totalDiscountPrice + shippingPrice).toFixed(2)} $` : `${(totalPrice + shippingPrice).toFixed(2)} $`}
                                    </Typography>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}

export default PaymentProgress;