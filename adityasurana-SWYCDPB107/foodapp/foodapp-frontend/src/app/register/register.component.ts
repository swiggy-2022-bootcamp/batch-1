import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string;
  requestuserDataSubscription : Subscription;
  addmodalReference: any;
  userAddForm: FormGroup;
  searchText = '';
  userDatatoCreate = {
		id: 0,
    username: '',
    email: '',
    password: '',
    address: {
      houseno: 0,
      street: '',
      state: '',
      city: '',
      zip: 0
    }
	};
  defaultHouseno = 0;
  defaultState = 'Rajasthan';


	constructor(
		private request: HttpAPIRequestService,
    private router: Router,
    private addmodalService: NgbModal,
		) { }

	ngOnInit() {
    this.userAddForm = new FormGroup({
			useraddData: new FormGroup({
				id: new FormControl(null, [Validators.required]),
				username: new FormControl(null, [Validators.required]),
				email: new FormControl(null, [Validators.required]),
				password: new FormControl(null, [Validators.required]),
				houseno: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zip: new FormControl(null, [Validators.required]),
			}),
		});
  }

  onAdd(content: any){
		this.addmodalReference = this.addmodalService.open(content, {ariaLabelledBy: 'modal-basic-title',});
	}

  onCreate() {
		this.userDatatoCreate.id = this.userAddForm.value.useraddData.id;
    this.userDatatoCreate.username = this.userAddForm.value.useraddData.username;
    this.userDatatoCreate.email = this.userAddForm.value.useraddData.email;
    this.userDatatoCreate.password = this.userAddForm.value.useraddData.password;
    this.userDatatoCreate.address.houseno = this.userAddForm.value.useraddData.houseno;
    this.userDatatoCreate.address.state = this.userAddForm.value.useraddData.state;
    this.userDatatoCreate.address.street = this.userAddForm.value.useraddData.street;
    this.userDatatoCreate.address.city = this.userAddForm.value.useraddData.city;
    this.userDatatoCreate.address.zip = this.userAddForm.value.useraddData.zip;
    this.request.userDatatoAdd(this.userDatatoCreate).subscribe((resultData) => {
      if (resultData) {
        this.message = "Registered"
      }
		});
		this.addmodalReference.close();
    this.router.navigate(['/']);
	}

  onLogin() {
    this.router.navigate(['/']);
  }
}
