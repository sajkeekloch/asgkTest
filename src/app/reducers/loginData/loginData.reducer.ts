import { createReducer, Action, on } from "@ngrx/store"
import { loginDataToggle } from "./loginData.actions"

export const loginDataNode = 'loginData'

export interface loginDataState {
    authorized: boolean
}

const initialState: loginDataState = {
    authorized: false
}

// export const fetchDataReducer = (state = initialState, action: fetchDataActions) => {
//     switch (action.type) {
//         case fetchDataActionsType.write:
//             return {
//                 ...state,
//                 token: action.payload.newToken,
//             }
//         default:
//             return state;
//     }
// }

export const loginDataReducer = createReducer(
    initialState,
    on(loginDataToggle, (state, action) => ({
        ...state,
        authorized: action.payload
    }))
)