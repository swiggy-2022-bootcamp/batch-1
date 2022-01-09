import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
	private Url = environment.URL;
	constructor(private http: HttpClient, private router: Router){}

	login(data:{email:string, password:string}): Observable<any>{
		return this.http.post(this.Url+"/api/authenticate",data,{
		headers: new HttpHeaders({ "Content-Type": "application/json" })
		})
		.pipe(
			tap(resData => {
				if(resData){
					this.handleAuthentication( resData.token );
				}
			})
		);
	}

	logout() {
		localStorage.removeItem('userData');
		this.router.navigate(['/']);
	}


	private handleAuthentication(token: string) {
		localStorage.setItem('userData', token);
	}
}
