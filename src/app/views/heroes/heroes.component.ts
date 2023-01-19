import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { HeroService, MessageService } from 'src/app/services';
import { Hero } from 'src/app/types';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) {}
  heroes: Hero[] = [];

  get notHeroesAvailable(): boolean {
    return this.heroes.length == 0
  }

  ngOnInit(){
    console.log("init");
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  onAddHero(heroName: string): void{
    heroName = heroName.trim()
    if(!heroName){ 
      this.messageService.add(`Cannot add a hero without name`)
      return 
    }

    this.heroService.addHero({ name: heroName } as Hero)
      .subscribe( hero => this.heroes.push(hero))
      
  }

  onDeleteHero(hero: Hero): void {
    const index = this.heroes.findIndex(x => x.id == hero.id)
    this.heroService.deleteHero(hero.id)
      .pipe(
        tap(_ => this.heroes.splice(index, 1))
      )
      .subscribe()
  }
}
