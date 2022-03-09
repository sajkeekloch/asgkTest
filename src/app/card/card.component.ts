import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchDataState } from '../reducers/fetchData/fetchData.reducer';
import { selectToken, selectKey } from '../reducers/fetchData/fetchData.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  public token$: Observable<string> = this.store$.pipe(select(selectToken))
  public key$: Observable<string> = this.store$.pipe(select(selectKey))
  token = ''
  key = ''
  url: string = 'https://api.asgk-group.ru/v1/'

  constructor(private store$: Store<fetchDataState>) {
  }

  @Input() card: any
  @Input() deleteCard: any
  @Input() getCards: any
  @Input() sendPush: any

  firstName : string = 'first name'
  lastName : string = 'past name'
  birth : string = ''
  discount : string = ''
  userId : number = 0

  ngOnInit(): void {
    this.key$.subscribe(key => this.key = key);
    this.token$.subscribe(token => this.token = token);
    this.firstName = this.card.first_name
    this.lastName = this.card.last_name
    this.userId = this.card.user_id
    this.birth = this.card.birthday
    this.userId = this.card.user_id
    this.discount = this.card.discount
  }

  delete():void {
    this.deleteCard(this.userId)
  }

  push():void {
    this.sendPush(this.userId)
  }
}
