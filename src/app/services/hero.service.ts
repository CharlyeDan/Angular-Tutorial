import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../types';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(
    private messageService: MessageService,
    private httpService: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  findHeroes(param: string): Observable<Hero[]> {
    if(!param.trim()){
      return of([])
    }

    const url = `${this.heroesURL}/?name=${param}`

    return this.httpService.get<Hero[]>(url)
      .pipe(
        tap(x => x.length 
            ? console.log(`Found heroes matching with param ${param}`)
            : console.log(`Not found heroes matching with param ${param}`)
        ),
        catchError(this.handleError<Hero[]>("findHeroes", []))
      )
  }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES)
    // this.messageService.add('Hero service: fetched heroes')
    // return heroes
    return this.httpService.get<Hero[]>(this.heroesURL).pipe(
      tap(_ => console.log("Fetched Heroes")),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: Number): Observable<Hero> {
    // const hero: Hero = HEROES.find(x => x.id === id)!
    // this.messageService.add(`Hero Service: fetched hero with id ${id}`)
    // return of(hero)

    const url = `${this.heroesURL}/${id}`
    return this.httpService.get<Hero>(url).pipe(
      tap(_ => console.log(`Fetched Hero with id ${id}`)),
      catchError(this.handleError<Hero>(`get hero with id ${id}`))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpService.post<Hero>(this.heroesURL, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Created hero with new id ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpService.put(this.heroesURL, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Update hero with id ${hero.id}`)),
        catchError(this.handleError<any>("updateHero"))
      )
  }

  deleteHero(id: number): Observable<any> {
    const url = `${this.heroesURL}/${id}`
    return this.httpService.delete(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Delete hero with id ${id}`)),
        catchError(this.handleError<Hero>("deleteHero"))
        
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)      
    }
  }
}
