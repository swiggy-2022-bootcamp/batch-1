import { Component } from '@angular/core';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-food-detail',
	templateUrl: './food-detail.component.html',
})
export class FoodDetailComponent {
  deletemodalReference: any;
  findfoodData = false;
  findfoodMessage: string = '';
  food: any;
	constructor(
		private request: HttpAPIRequestService,
		) { }

  onFindFood(form: NgForm){
		if (!form.valid) {
			return;
		}
		const findfoodid = form.value.findfoodid;
    this.findfoodData = false
    this.findfoodMessage = `Sorry Food not found`;
    this.request.foodDatatoFind(findfoodid).subscribe((resultData) => {
      if (resultData) {
        this.food = resultData;
        this.findfoodData = true;
      }
    });
  }
}
