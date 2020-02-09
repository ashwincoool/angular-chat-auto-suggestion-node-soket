import {Injectable} from "@angular/core";

@Injectable()
export class ChatAiService {
    
    array =  [
                {text: "Hi",suggestion:["Hello","How are you?","I am Fine!"]},
                {text: "Hello",suggestion:["Hi","How are you?","I am Fine!"]},
                {text: "How are you?",suggestion:["I am Fine!","Am Good","Relaxed!"]}
              ];

}