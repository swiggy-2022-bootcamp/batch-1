import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class HttpAPIRequestService {
	private Url = environment.URL;
	constructor(private http: HttpClient, private authService: AuthService,) {}

	userDatatoGet() : Observable<any>{
		return this.http.get(this.Url+"/api/users");
	}
	userDatatoDelete(id: string) : Observable<any>{
		return this.http.delete(this.Url+"/api/users/"+id);
	}

  userDatatoFind(id: string) : Observable<any>{
		return this.http.get(this.Url+"/api/users/"+id);
	}

  userDatatoUpdate(data: {id:number, username:string, email:string, password:string, address:{houseno:number, street:string, city:string, state:string, zip:number}}): Observable<any> {
		return this.http.put(this.Url+"/api/users", data,{
			headers: new HttpHeaders({ "Content-Type": "application/json" })
		})
	}

	userDatatoAdd(data: {id:number, username:string, email:string, password:string, address:{houseno:number, street:string, city:string, state:string, zip:number}}): Observable<any> {
		return this.http.post(this.Url+"/api/register", data,{
			headers: new HttpHeaders({ "Content-Type": "application/json" })
		})
	}

	foodDatatoGet() : Observable<any>{
		return this.http.get(this.Url+"/api/food");
	}

  foodDatatoAdd(data: {foodId:number, foodName:string, foodCost:number, foodType:string}): Observable<any> {
		return this.http.post(this.Url+"/api/food", data,{
			headers: new HttpHeaders({ "Content-Type": "application/json" })
		})
	}

  foodDatatoFind(id: string) : Observable<any>{
		return this.http.get(this.Url+"/api/food/"+id);
	}

	verifyUser(secretToken:{secretToken:string}): Observable<any> {
		return this.http.post(this.Url+"/api/verifyUser", secretToken,{
			headers: new HttpHeaders({ "Content-Type": "application/json" })
		}).pipe(
			tap( data => {
				if(!data){
					this.authService.logout();
					window.alert("Token Unauthenticated, Please Login Again");
				}
			})
		);
	}
}
