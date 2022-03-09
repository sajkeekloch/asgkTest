import { Action, createAction, props } from "@ngrx/store"

export enum loginDataActionsType  {
    toggle = '[AUTHORIZED] toggle',
}

export const loginDataToggle = createAction(
    '[AUTHORIZED] toggle',
    props<{payload: boolean}>()
)

export type loginDataActions = typeof loginDataToggle