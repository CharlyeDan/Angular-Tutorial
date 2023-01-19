import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services';
import { Hero } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []

  constructor(private heroesService: HeroService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      heroes => this.heroes = heroes.slice(1, 5)
    )
  }
}
