import { Component, OnInit } from '@angular/core';
import { User } from './_model/AuthenticationTypes';
import { Product } from './_model/Product';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  values: Product[] = [];
  loggedInUser: User = this.storageService.getUser();
  loggedIn: boolean = false;

  constructor( public storageService: StorageService) {
  }

  ngOnInit(): void {
    let user = this.storageService.getUser();
    if (user && user.Username) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logOut(){
    this.storageService.logOut();
    $("#modalBody").html('You successfully logged out!');
    $('#infoModal').modal('toggle');
  }
}
