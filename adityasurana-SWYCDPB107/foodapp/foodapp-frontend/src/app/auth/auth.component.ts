import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit{
	error:boolean = false;
	authData = {
		email: '',
		password: ''
	};
	constructor(
		private authService: AuthService,
		private router: Router,
	) { }


	ngOnInit(){
		if(localStorage.getItem('userData')){
			this.router.navigate(['/food']);
		}
	}

	onSubmit(form: NgForm){
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
		const password = form.value.password;
		this.authData.email = email;
		this.authData.password = password;
		this.authService.login(this.authData).subscribe(
		resultData => {
			if(!resultData){
				this.error = true;
			}
			else{
				this.router.navigate(['/food']);
			}
		},
		error => {
			console.log("Ohh No error", error)
		}
		);
    this.error = true;
		form.reset();
	}
}
