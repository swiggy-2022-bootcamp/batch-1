import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
	Token = {
		secretToken : ''
	}
  username: string;

	constructor(
		private request: HttpAPIRequestService,
		private authService: AuthService,
	) { }

	ngOnInit(){
    this.Token.secretToken = localStorage.getItem('userData');
    this.request.verifyUser(this.Token).subscribe((userDetail) => {
      this.username = userDetail.username;
    })
	}

	onLogout(){
		this.authService.logout();
	}

}
