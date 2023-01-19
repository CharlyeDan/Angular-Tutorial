import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
  declarations: [
    HeroesComponent,
    DashboardComponent,
    HeroDetailsComponent,
  ],
  imports: [ ComponentsModule, FormsModule, BrowserModule, AppRoutingModule ],
  providers: [],
  exports: []
})
export class ViewsModule { }
