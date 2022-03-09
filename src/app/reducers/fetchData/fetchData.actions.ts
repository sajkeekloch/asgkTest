import { Action, createAction, props } from "@ngrx/store"

export enum fetchDataActionsType  {
    write = '[TOKEN] write'
}

// export class fetchDataWriteToken implements Action {
//     readonly type = fetchDataActionsType.write 
//     constructor(public payload: {
//         newToken: string
//     }) {}
// }

export const fetchDataWriteToken = createAction(
    '[TOKEN] write',
    props<{payload: string}>()
)

export type fetchDataActions = typeof fetchDataWriteToken