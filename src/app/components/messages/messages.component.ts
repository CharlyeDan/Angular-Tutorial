import { Component } from '@angular/core';
import { MessageService } from 'src/app/services';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
  
  get messages(): string[] {
    return this.messageService.messages
  }

  get isMessageAvailable(): boolean {
    return this.messages.length > 0
  }

  onClear(message: string): void {
    this.messageService.clear(message)
  }
}
