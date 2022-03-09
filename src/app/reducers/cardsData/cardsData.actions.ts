import { Action, createAction, props } from "@ngrx/store"

export enum cardsDataActionsType  {
    change = '[CARDS] change',
}

export const cardsDataChange = createAction(
    '[CARDS] change',
    props<{payload: Array<number>}>()
)

export type cardsDataActions = typeof cardsDataChange