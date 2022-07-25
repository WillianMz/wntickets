import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() titlePage: string;
  @Input() menus: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.titlePage = "wntickets";
  }

}
