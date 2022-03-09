import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { fetchDataNode, fetchDataState } from "./fetchData.reducer";


export const selectFetchDataFeature = createFeatureSelector<fetchDataState>(fetchDataNode)

export const selectToken = createSelector(
    selectFetchDataFeature,
    (state: fetchDataState):string => state.token
)

export const selectKey = createSelector(
    selectFetchDataFeature,
    (state: fetchDataState):string => state.key
)