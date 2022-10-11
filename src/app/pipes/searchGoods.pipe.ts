import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'searchGoods'
})
export class SearchGoodsPipe implements PipeTransform {
    transform(arr: any[], searchInput: string): any[]{     
        if(!searchInput) {
            return  arr;
        }
       searchInput = searchInput.toLowerCase();
       return arr.filter(
           x =>x.short.toLowerCase().includes(searchInput)
       )
     }
}