import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Store, select, State} from '@ngrx/store';
import { fetchDataState } from '../reducers/fetchData/fetchData.reducer'
import { Observable } from 'rxjs'
import { selectKey, selectToken } from '../reducers/fetchData/fetchData.selectors';
import { fetchDataWriteToken } from '../reducers/fetchData/fetchData.actions';
import { selectIsLogined } from '../reducers/loginData/loginData.selectors';
import { loginDataToggle } from '../reducers/loginData/loginData.actions';
import { cardsDataChange } from '../reducers/cardsData/cardsData.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './authForm.component.html',
  styleUrls: ['./authForm.component.sass']
})

export class AuthForm implements OnInit {

    public token$: Observable<string> = this.store$.pipe(select(selectToken))
    public key$: Observable<string> = this.store$.pipe(select(selectKey))
    public authorized$: Observable<boolean> = this.store$.pipe(select(selectIsLogined))
    token = ''
    key = ''
    authorized = false
    url: string = 'https://api.asgk-group.ru/v1/'

    @Input() getCards: any

    ngOnInit(): void {
        this.key$.subscribe(key => this.key = key);
        this.token$.subscribe(token => this.token = token);
    }
    
    constructor(private store$: Store<fetchDataState>) {
    }

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
    get email() {
        return this.loginForm.get('email')
    }
    get password() {
        return this.loginForm.get('password')
    }

    submit() {
        event?.preventDefault()
        this.authOnNewPC()
        
    }

    authOnNewPC() {
        fetch(`${this.url}authorization`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': this.key
            },
            body: JSON.stringify({ 'identifier': 'новый адрес' })
        })
        .then( res => res.json() )
        .then( res => {
            this.store$.dispatch(fetchDataWriteToken({
                payload: res.tokens[0].token
            }))  
            this.getCards()
            this.store$.dispatch(loginDataToggle({
                payload: true
            }))
        } )
        .catch( (e) => {
            console.error(e.response)
            alert(`ошибка получения нового токена: ${e}, пробуем запросить токен по ключу`)
            this.authAfterErr()
        } )
    }

    authAfterErr() {
        fetch(`${this.url}authorization`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': this.key
            },
            // body: JSON.stringify({ 'identifier': 'улица' })
        })
        .then( res => res.json() )
        .then( res => {
            this.store$.dispatch(fetchDataWriteToken({
                payload: res.tokens[0].token
            }))  
            this.getCards()
            this.store$.dispatch(loginDataToggle({
                payload: true
            }))
        }  )
        .catch( error => alert(error) )
    }
}
