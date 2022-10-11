import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value: string): string {
                if(!value) {
                    return  value;
                }
            let arr = value.split('').splice(4, 9);
            let result: any = [];
            arr.map((item, index) => {
            if(index % 3 === 0 && index > 1){
                result.push('-')
            }
            else result.push(item)
            })
            return result.join('')
    }      
}