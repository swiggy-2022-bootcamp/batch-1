import { Component } from '@angular/core';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-manage-user',
	templateUrl: './manage-user.component.html',
})
export class ManageUserComponent {
  deletemodalReference: any;
  findData = false;
  deleteData = false;
  editData = false;
  editCount = 0;
  deleteMessage: string = '';
  findMessage: string = '';
  editMessage: string = '';
  Users: any;
  updateUsers : any;

	constructor(
		private request: HttpAPIRequestService,
		) { }

	ngOnInit() {

  }
  onFind(form: NgForm){
		if (!form.valid) {
			return;
		}
		const findid = form.value.findid;
    this.findData = false
    this.findMessage = `Sorry User with id: ${findid} not found`;
    this.request.userDatatoFind(findid).subscribe((resultData) => {
      if (resultData) {
        this.Users = resultData;
        this.findData = true;
      }
    });
  }
  onEdit(form: NgForm){
		if (!form.valid) {
			return;
		}
		const id = form.value.updateid;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const houseno = form.value.houseno;
    const street = form.value.street;
    const city = form.value.city;
    const state = form.value.state;
    const zip = form.value.zip;
    this.editData = false;
    this.editMessage = `Sorry User with id: ${id} not found`;
    this.request.userDatatoUpdate({id, username, email, password, address:{houseno, street, city, state, zip}}).subscribe((resultData) => {
      if (resultData) {
        this.updateUsers = {id, username, email, address:{houseno, street, city, state, zip}};
        this.editData = true;
      }
    });
  }
  onDelete(form: NgForm){
		if (!form.valid) {
			return;
		}
		const deleteid = form.value.deleteid;
    this.deleteMessage = `Sorry User with id: ${deleteid} not found`;
    this.deleteData = true;
    this.request.userDatatoDelete(deleteid).subscribe((resultData) => {
      if (resultData) {
        this.deleteMessage = "User Deleted Successfully";
      }
    });
  }
}
