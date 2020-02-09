import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../src/app/chat.service';
import { ChatAiService } from '../../src/app/chat-ai';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;
  messages: string[] = [];
  user_id = Math.floor((Math.random() * 100) + 1);
  msg;
  suggestions:[];

  @ViewChild('lastMessage',{static: false}) lastMessage: ElementRef;

  constructor(private chatService: ChatService, private chatAi: ChatAiService) {
  }


  

  sendMessage() {
    this.chatService.sendMessage(this.message,this.user_id);
    this.message = '';
    this.suggestions=[];
   }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
        this.checkLatestMsg(this.messages);
      });

      console.log(this.chatAi.array)
  }

   checkLatestMsg(arr){
  //  const valueInput = this.lastMessage.nativeElement.value
  var lastObj = arr.slice(-1).pop()
      if(lastObj.user_id!=this.user_id){
        this.suggestionWords(lastObj.message)
      }
   }

   suggestionWords(forTheWord){
 
    var suggestionList = this.search(forTheWord,this.chatAi.array)
    if(suggestionList!=""){
      this.suggestions = suggestionList.suggestion;
    }else{
      this.suggestions=[];
    }
    
   }

    search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].text.toLowerCase() === nameKey.toLowerCase()) {
            return myArray[i];
        }
    }
}

appendSuggestion(suggestion){
  this.message= suggestion
}

}