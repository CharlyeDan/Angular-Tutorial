import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesComponent } from './messages/messages.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    MessagesComponent,
    HeroSearchComponent
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  exports: [
    MessagesComponent,
    HeroSearchComponent
  ]
})
export class ComponentsModule { }
