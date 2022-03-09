import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginDataNode, loginDataState } from "./loginData.reducer";


export const selectLoginDataFeature = createFeatureSelector<loginDataState>(loginDataNode)

export const selectIsLogined = createSelector(
    selectLoginDataFeature,
    (state: loginDataState):boolean => state.authorized
)