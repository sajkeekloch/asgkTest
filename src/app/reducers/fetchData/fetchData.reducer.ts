import { createReducer, Action, on } from "@ngrx/store";
import { fetchDataWriteToken } from "./fetchData.actions";

export const fetchDataNode = 'fetchData'

export interface fetchDataState {
    token: string
    key: string
}

const initialState: fetchDataState = {
    token: '',
    key: 'b50c483dbde52af63210cdf748e38c0d'
    //b35f994b30d76f679664e7a664558ff8
}

export const fetchDataReducer = createReducer(
    initialState,
    on(fetchDataWriteToken, (state, action) => ({
        ...state, 
        token: action.payload
    }))
)