import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = []
  constructor() { }

  add(message: string): void {
    this.messages.push(message)
  }

  clear(message: string): void {
    const index = this.messages.findIndex(x => x === message)
    if(index > -1){
      this.messages.splice(index, 1)
    }
  }
}
