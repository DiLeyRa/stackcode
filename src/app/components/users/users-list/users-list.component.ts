import { Component, OnInit } from '@angular/core';

import {UserService} from '../../../services/user.service';
import { User } from '../../../models/user';




@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList : User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
    .snapshotChanges()
    .subscribe(item =>{
      this.userList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.userList.push(x as User);
      });
    });
  }

  onEdit(user:User){
    this.userService.selectedUser = Object.assign({},user);
    }
  onDelate($key:string){
    this.userService.deleteUser($key);
  }
}
