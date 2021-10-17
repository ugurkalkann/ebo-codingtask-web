import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_model/AuthenticationTypes';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthenticationService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  login(){
    let userInfo: User = {
      Username: this.username,
      Password: this.password
    };

    this.authService.login(userInfo).subscribe(
      data => {
        if(data.IsSuccessful === true){
          //Fill SessionStorage
          this.storageService.saveUser(data.UserInfo);
          //console.log("token: ", data.AuthToken);
          this.storageService.saveAuthToken(data.AuthToken);
          
          this.router.navigate(['/products']);
        }else{
          $("#modalBody").html(data.Message);
          $('#infoModal').modal('toggle');
        }
      },
      err => {
        console.log(err);
        $("#modalBody").html('There is an error while authentication. Check logs for more info');
        $('#infoModal').modal('toggle');
      }
    );
  }

}
