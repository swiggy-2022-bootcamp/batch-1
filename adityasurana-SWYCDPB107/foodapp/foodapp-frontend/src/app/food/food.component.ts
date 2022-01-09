import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpAPIRequestService } from '../HttpAPIRequest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-food',
	templateUrl: './food.component.html',
	styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  requestfoodDataSubscription : Subscription;
  addmodalReference: any;
  foodAddForm: FormGroup;
  searchText = '';
	Foods = [];
  foodDatatoCreate = {
		foodId: 0,
    foodName: '',
    foodCost: 0,
    foodType: '',
	};
  defaultFoodCost = 0;
  defaultFoodType = 'Indian';


	constructor(
		private request: HttpAPIRequestService,
    private addmodalService: NgbModal,
		) { }

	ngOnInit() {
    this.requestfoodDataSubscription = this.request.foodDatatoGet().subscribe((resultData) => {
			this.Foods = resultData;
		});

    this.foodAddForm = new FormGroup({
			foodaddData: new FormGroup({
				foodId: new FormControl(null, [Validators.required]),
				foodName: new FormControl(null, [Validators.required]),
				foodCost: new FormControl(null, [Validators.required]),
				foodType: new FormControl(null, [Validators.required]),
			}),
		});

  }

  onAdd(content: any){
		this.addmodalReference = this.addmodalService.open(content, {ariaLabelledBy: 'modal-basic-title',});
	}

  onCreate(){
		this.foodDatatoCreate.foodId = this.foodAddForm.value.foodaddData.foodId;
    this.foodDatatoCreate.foodName = this.foodAddForm.value.foodaddData.foodName;
    this.foodDatatoCreate.foodCost = this.foodAddForm.value.foodaddData.foodCost;
    this.foodDatatoCreate.foodType = this.foodAddForm.value.foodaddData.foodType;
		this.request.foodDatatoAdd(this.foodDatatoCreate).subscribe((resultData) => {
      this.Foods.push(resultData);
		});
		this.addmodalReference.close();
	}

}
