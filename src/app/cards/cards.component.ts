import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGetCards } from '../reducers/cardsData/cardsData.selectors';
import { fetchDataState } from '../reducers/fetchData/fetchData.reducer';
import { selectToken, selectKey } from '../reducers/fetchData/fetchData.selectors';
import { selectIsLogined } from '../reducers/loginData/loginData.selectors';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit{
  
  public cards$: Observable<Array<number>> = this.store$.pipe(select(selectGetCards))
  public authorized$: Observable<boolean> = this.store$.pipe(select(selectIsLogined))
  public token$: Observable<string> = this.store$.pipe(select(selectToken))
  public key$: Observable<string> = this.store$.pipe(select(selectKey))
  token = ''
  key = ''
  card = []
  cardsList: Array<number> = []
  url: string = 'https://api.asgk-group.ru/v1/'

  @Input() getCards: any

  constructor(private store$: Store<fetchDataState>) {
  }

  ngOnInit(): void {
    this.cards$.subscribe(cards => this.cardsList = cards)
    this.key$.subscribe(key => this.key = key);
    this.token$.subscribe(token => this.token = token);
  }

  createNewCard() {
    event?.preventDefault()
    fetch(`${ this.url + this.token }/passes`,
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': this.key
        },
        body: JSON.stringify({
            'template': 'Тестовый',
            'first_name': 'firstName',
            'last_name': 'lastName',
            'pat_name': 'Иванович',
            'phone': '79876543211',
            'email': 'support@asgk-group.ru',
            'birthday': '01.03.1990',
            'gender': 'м',
            'barcode': '0000001',
            'discount': '10%',
            'bonus': 200,
            'loyalty_level': 'Серебряный'
          })
      })
      .then( res => {
        this.getCards()
      } )
      .catch( res => res )
  } 

  deleteCard(userId: number): void {
    fetch(`${ this.url + this.token }/passes/${userId}`,
      {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': this.key
        }
      })
      .then( res => {
        this.getCards()
      } )
      .catch( res => alert(res) )    
  }

  sendPush(userId: number): void {
    console.log('push');
    
    fetch(`${ this.url + this.token }/push/message?search`,
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': this.key
        },
        body: JSON.stringify({
          'user_id': userId,
          'push_message': 'Только сегодня скидка 10% на все товары'
        })
      })
      .then( res => {
        res.ok? alert(`sent to: ${userId}`) :alert(`err! userId: ${userId} ${res.statusText}`)
      } )
      .catch( res => alert(res) )
  }
}