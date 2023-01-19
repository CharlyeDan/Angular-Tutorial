import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { HeroService } from 'src/app/services';
import { Hero } from 'src/app/types';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero | undefined

  constructor(
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location,
    ) {}

    ngOnInit(): void {
      this.init()
    }

    init(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'))
      this.heroService
        .getHero(id)
        .subscribe(hero => this.hero = hero)
    }

    onSaveHero(): void {
      if (this.hero) {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
      }
    }

    onDeleteHero(): void {
      if (this.hero) {
        this.heroService.deleteHero(this.hero.id)
          .pipe(
            tap(_ => this.goBack())
          )
          .subscribe()
      }
    }

    goBack(): void {
      this.location.back()
    }
}
