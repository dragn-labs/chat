import { Component , ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('messageContainer', {static: false}) myDiv: ElementRef;
  @ViewChild('userInput', {static: false}) userTextBox: ElementRef;

  conversationHistory: Message[] = [];
  visibleConversationHistory: Message[] = [];
  eveIsThinking = false;
  eveTypingMessages = ['Eve is typing', 'Eve is typing.', 'Eve is typing..', 'Eve is typing...', 'Eve is typing....'];
  typingMessageIndex = 0;

  moodsToColors = {'Sad': {r: 0xD9, b: 0xE5, g: 0xD6, mood: 'Sad'},
                   'Upset': {r: 0xD3, b: 0x65, g: 0x77, mood: 'Upset'},
                   'Happy': {r: 0x01, b: 0xBA, g: 0xEF, mood: 'Happy'},
                   'Excited': {r: 0xFF, b: 0xFF, g: 0x72, mood: 'Excited'},
                   'Neutral': {r: 0x7D, b: 0xDF, g: 0x64, mood: 'Neutral'}}

  currentColor: Color = {r: 0x7D, b: 0xDF, g: 0x64, mood: ''};
  targetColor: Color = this.moodsToColors['Neutral'];

  constructor() {
    this.updateMessageIndex();
    this.updateMoodColor();
  }

  updateMessageIndex() {
    setTimeout(() => {
      this.typingMessageIndex++;
      this.typingMessageIndex %= 5;
      this.updateMessageIndex();
    }, 600);
  }

  createColorString(color: Color): string {
    var ret = '#';
    ['r', 'b', 'g'].forEach(colorKey => {
      var colorString = color[colorKey].toString(16);
      if (colorString.length == 1) {
        colorString = '0' + colorString;
      }
      ret = ret + colorString;
    });
    return ret;
  }

  updateMoodColor() {
    setTimeout(() => {
      var isEqual = true;
      ['r', 'b', 'g'].forEach(colorKey => {
        if (this.currentColor[colorKey] < this.targetColor[colorKey]) {
          isEqual = false;
          this.currentColor[colorKey]++;
        } else if (this.currentColor[colorKey] > this.targetColor[colorKey]) {
          isEqual = false;
          this.currentColor[colorKey]--;
        }
      });
      document.body.style.backgroundColor = this.createColorString(this.currentColor);
      if (!isEqual) {
        this.updateMoodColor();
      }
    }, 20);
  }

  postUserMessage(message: string) {
    this.userTextBox.nativeElement.disabled = true;
    this.conversationHistory.push({text: message, from: 'User'});
    this.updateVisibleMessages();
    if (Object.keys(this.moodsToColors).includes(message)) {
      this.targetColor = this.moodsToColors[message];
      this.updateMoodColor();
      this.postEveMessage('I am ' + message);
    } else {
      setTimeout(() => this.postEveMessage(), 500);
    }
  }

  postEveMessage(givenMessage?: string) {
    this.eveIsThinking = true;
    this.typingMessageIndex = 0;
    setTimeout(() => {
      // FIXME this is where I will send conversation to server to get the next response
      const cannedResponses = ['[Witty reply]', '[Helpful insight]', '[Clarifying question]', 'Yes, I agree', 'I am not so sure', 'Thanks, I needed that', 'You\'re a good friend.'];
      const randResponse = cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
      this.conversationHistory.push({text: givenMessage || randResponse, from: 'Eve'});
      this.eveIsThinking = false;
      this.updateVisibleMessages();
      this.userTextBox.nativeElement.disabled = false;
      this.userTextBox.nativeElement.focus();
    }, givenMessage ? 1000 : (2000 + Math.random() * 2000));
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

interface Color {
  r: number;
  b: number;
  g: number;
  mood: string;
}