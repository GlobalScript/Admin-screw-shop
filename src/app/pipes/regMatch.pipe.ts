import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'regMatch'
})
export class RegMatchPipe implements PipeTransform {
    transform(value: string): string {
        if(!value) {
            return  value;
        }
        const myRe = /\d{9}/;
        const newString: any = myRe.exec(value);
        return newString[0];
    }  
}