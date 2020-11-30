export interface AddressState {
    name: AddressStateValidatorKeyPair<string>,
    address: AddressStateValidatorKeyPair<string>,
    unit: AddressStateValidatorKeyPair<string>,
    city: AddressStateValidatorKeyPair<string>,
    state: AddressStateValidatorKeyPair<string>,
    zip: AddressStateValidatorKeyPair<string>,
    country: AddressStateValidatorKeyPair<string>,
    email: AddressStateValidatorKeyPair<string>,
}

type ValidatorCallback<T> = ((current:T)=>T);
export class AddressStateValidatorKeyPair<T> {
    key: string;
    value: T;
    validators: Array<AddressStateValidator<T>>
    public constructor(key: string, value: T) {
        this.key = key;
        this.value = value;
        this.validators = [];
    }

    public getKey = () => this.key;
    public getValue = () => this.value;
    public setValue = (callback:ValidatorCallback<T>):AddressStateValidatorKeyPair<T> => {
        var val = callback(this.value);
        var ret = new AddressStateValidatorKeyPair(this.key, val);
        ret.validators = this.validators;
        return ret;
    }
    public toString():string {
        return this.value.toString();
    }
    public addValidator(validator: AddressStateValidator<T>) {
        this.validators.push(validator);
    }
    public validate():{valid:boolean, message:string} {
        for(var validator of this.validators) {
            var v = validator.validate(this.value);
            if(!v.valid) {
                return v;
            }
        }
        return {valid: true, message: ""};
    }
}

export interface AddressStateValidator<T> {
    validate(arg0: T):{valid:boolean, message:string};
}

export const addressStateValidatorNotEmptyString = new class implements AddressStateValidator<string> {
    validate(arg0: string): {valid:boolean, message:string} {
        const valid = arg0 === "";
        return {valid, message: valid ? "" : "Field must not be left empty"};
    }
}

