import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  boolInput: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  adicionarRole() {
    this.boolInput = true;
  }

  salvarRole() {
    
  }

}
