import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goHistoric(){
    this.router.navigate(['tickets/1/historic']);
  }

  goComments(){
    this.router.navigate(['tickets/1/comments']);
  }

  goAttachments(){
    this.router.navigate(['tickets/1/attachments']);
  }

}
