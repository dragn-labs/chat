import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  conversationHistory: Message[] = [];
  visibleConversationHistory: Message[] = [];

  postUserMessage(message: string) {
    this.conversationHistory.push({text: message, from: 'User'});
    this.postEveMessage();
    this.updateVisibleMessages();
  }

  postEveMessage() {
    // FIXME this is where I will send conversation to server to get the next response
    const cannedResponses = ['[Witty reply]', '[Pithy comment]', '[Helpful insight]', '[Clarifying question]', 'Yes, I agree', 'How does that relate to airplanes?', 'Thanks, I needed that'];
    const randResponse = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];

    this.conversationHistory.push({text: randResponse, from: 'Eve'});
    this.updateVisibleMessages();
  }

  updateVisibleMessages() {
    this.visibleConversationHistory = this.conversationHistory.slice(Math.max(this.conversationHistory.length - 6, 0))
  }
}

interface Message {
  text: string;
  from: 'User'|'Eve';
}