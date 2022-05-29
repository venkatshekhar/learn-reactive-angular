import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]   // This service will be available to home component and its child components
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {


  }

  logout() {

  }

}
