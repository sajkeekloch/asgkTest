import { ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { cardsDataNode, cardsDataReducer, cardsDataState } from './cardsData/cardsData.reducer';
import { fetchDataNode, fetchDataReducer, fetchDataState } from './fetchData/fetchData.reducer';
import { loginDataNode, loginDataReducer, loginDataState } from './loginData/loginData.reducer';
  
export interface State {
  [fetchDataNode]: fetchDataState,
  [loginDataNode]: loginDataState,
  [cardsDataNode]: cardsDataState,
}
  
export const reducers: ActionReducerMap<State> = {
  [fetchDataNode]: fetchDataReducer,
  [loginDataNode]: loginDataReducer,
  [cardsDataNode]: cardsDataReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];