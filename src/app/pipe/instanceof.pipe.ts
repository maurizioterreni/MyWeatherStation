import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'instanceof'
})
export class InstanceofPipe implements PipeTransform {

    transform(object: Object, objectType: string): boolean {
        return object.constructor.name === objectType;
    }
}
