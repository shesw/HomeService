import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsUrlConstraint implements ValidatorConstraintInterface {
    validate(url: string): boolean;
}
export declare function IsUrl(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
