import { Component, OnInit } from '@angular/core';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  requestuserDataSubscription : Subscription;
  searchText = '';
	Users = [];

	constructor(
		private request: HttpAPIRequestService,
		) { }

	ngOnInit() {
    this.requestuserDataSubscription = this.request.userDatatoGet().subscribe((resultData) => {
			this.Users = resultData;
		});
  }
}
