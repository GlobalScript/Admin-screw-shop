import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'searchCart'
})
export class SearchCartPipe implements PipeTransform {
    transform(arr: any[], searchInput: string): any[]{     
        if(!searchInput) {
            return  arr;
        }
       searchInput = searchInput.toLowerCase();
       return arr.filter(
           x =>x.phone_number.toLowerCase().includes(searchInput)
       )
     }
}