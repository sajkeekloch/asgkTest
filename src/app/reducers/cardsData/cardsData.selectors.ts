import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cardsDataState, cardsDataNode } from "./cardsData.reducer";


export const selectCardsDataFeature = createFeatureSelector<cardsDataState>(cardsDataNode)

export const selectGetCards = createSelector(
    selectCardsDataFeature,
    (state: cardsDataState):Array<number> => state.cards
)