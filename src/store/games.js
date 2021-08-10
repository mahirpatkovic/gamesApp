import { createSlice } from "@reduxjs/toolkit";

const initialGamesState = {
    games: [],
};
const gamesSlice = createSlice({
    name: 'fetchGames',
    initialState: initialGamesState,
    reducers: {
        fetchGames(state, {payload: games}) {
            state.games = games;
            console.log(games);
        },
    },
});
export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;