import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { HeroService } from 'src/app/services';
import { Hero } from 'src/app/types';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  heroes$!: Observable<Hero[]>
  private searchParams = new Subject<string>()

  constructor(private heroService: HeroService) {}

  onSearchHero(param: string): void {
    this.searchParams.next(param)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchParams.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((param: string) => this.heroService.findHeroes(param))
    )
  }
}
