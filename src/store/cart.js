import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    addedGamesToCart: [],
};
const cartSlice = createSlice({
    name: 'addToCartGames',
    initialState: initialCartState,
    reducers: {
        addToCart(state, {payload: game}){
            state.addedGamesToCart.push(game);
            console.log("test", game)
        },
    },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;