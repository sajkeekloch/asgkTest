import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cardsDataChange } from './reducers/cardsData/cardsData.actions';
import { fetchDataState } from './reducers/fetchData/fetchData.reducer';
import { selectToken, selectKey } from './reducers/fetchData/fetchData.selectors';
import { selectIsLogined } from './reducers/loginData/loginData.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'asgk-group-test';

  public token$: Observable<string> = this.store$.pipe(select(selectToken))
  public key$: Observable<string> = this.store$.pipe(select(selectKey))
  public authorized$: Observable<boolean> = this.store$.pipe(select(selectIsLogined))
  token = ''
  key = ''
  authorized = false
  url: string = 'https://api.asgk-group.ru/v1/'

  ngOnInit(): void {
    this.key$.subscribe(key => this.key = key);
    this.token$.subscribe(token => this.token = token);
  }

  constructor(private store$: Store<fetchDataState>) {
  }

  getCards() {
    const cards = async (): Promise<any> => {
      const data: Object = await fetch(`${ this.url + this.token }/passes?search&limit&offset'`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': this.key
        }
      })
      .then( res => res.json())
      .then( res => {
        this.store$.dispatch(cardsDataChange({
            payload: [...res.passes]
        }))
      } )
      .catch( res => res )
      return data
    }
    cards()
  }
}
