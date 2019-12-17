import { Component , ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('messageContainer', {static: false}) myDiv: ElementRef;

  conversationHistory: Message[] = [];
  visibleConversationHistory: Message[] = [];
  eveIsThinking = false;
  eveTypingMessages = ['Eve is typing', 'Eve is typing.', 'Eve is typing..', 'Eve is typing...', 'Eve is typing....'];
  typingMessageIndex = 0;

  constructor() {
    this.updateMessageIndex();
  }

  updateMessageIndex() {
    setTimeout(() => {
      this.typingMessageIndex++;
      this.typingMessageIndex %= 5;
      this.updateMessageIndex();
    }, 600);
  }

  postUserMessage(message: string) {
    this.conversationHistory.push({text: message, from: 'User'});
    this.updateVisibleMessages();
    setTimeout(() => this.postEveMessage(), 500);
  }

  postEveMessage() {
    this.eveIsThinking = true;
    this.typingMessageIndex = 0;
    setTimeout(() => {
      // FIXME this is where I will send conversation to server to get the next response
      const cannedResponses = ['[Witty reply]', '[Pithy comment]', '[Helpful insight]', '[Clarifying question]', 'Yes, I agree', 'I am not so sure', 'Thanks, I needed that', 'You\'re a good friend.'];
      const randResponse = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
      this.conversationHistory.push({text: randResponse, from: 'Eve'});
      this.eveIsThinking = false;
      this.updateVisibleMessages();
    }, 2000 + Math.random() * 2000);
  }

  updateVisibleMessages() {
    this.visibleConversationHistory = this.conversationHistory;
    setTimeout(() => {
      this.myDiv.nativeElement.scrollTop = this.myDiv.nativeElement.scrollHeight; 
    }, 100)
    // this.visibleConversationHistory = this.conversationHistory.slice(Math.max(this.conversationHistory.length - 6, 0))
  }
}

interface Message {
  text: string;
  from: 'User'|'Eve';
}