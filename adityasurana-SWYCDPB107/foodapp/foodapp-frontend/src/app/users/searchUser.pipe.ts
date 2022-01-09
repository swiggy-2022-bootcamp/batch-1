import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchUser' })
export class SearchUserPipe implements PipeTransform {
	/**
	 * Transform
	 *
	 * @param {any[]} list
	 * @param {string} searchText
	 * @returns {any[]}
	 */
	transform(list: any[], searchText: string): any {
		if (!list) {
		return [];
		}
		if (!searchText) {
			return list;
		}
		searchText = searchText.toLowerCase();
		var ans = list.filter(it => {
		return it.username.toLowerCase().includes(searchText) || it.email.toLowerCase().includes(searchText);
		});
		if(ans.length===0){
			return [{name : "Match Not Found"}] ;
		}
		else{
			return ans;
		}
	}
}
