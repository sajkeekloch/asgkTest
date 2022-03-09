import { createReducer, Action, on } from "@ngrx/store"
import { cardsDataChange } from "./cardsData.actions"

export const cardsDataNode = 'cardsData'

export interface cardsDataState {
    cards: Array<number>
}

const initialState: cardsDataState = {
    cards: []
}

export const cardsDataReducer = createReducer(
    initialState,
    on(cardsDataChange, (state, action) => ({
        ...state,
        cards: action.payload
    }))
)