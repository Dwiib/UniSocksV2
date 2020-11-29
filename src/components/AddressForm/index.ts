export interface AddressState {
    name: string,
    address: string,
    unit: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    email: string,
    ethereumAddress: string,
    time: number,
    redeemedSocks: number,
}

export function defaultAddressState(): AddressState {
    return <AddressState>{
        name: "",
        address: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        email: "",
        ethereumAddress: "",
        time: 0,
        redeemedSocks: 0,
    };
}

export interface AddressStateValidator<T> {
    validate(arg0: T):[boolean, string];
}

export const addressStateValidatorNoOp = <T>() => {
    return new class<T> implements AddressStateValidator<T> {
        validate(arg0: T): [boolean, string] {
            return [true, ""]
        }
    }
}

export const addressStateValidatorNotEmptyString = new class implements AddressStateValidator<string> {
    validate(arg0: string): [boolean, string] {
        const valid = arg0 === "";
        return [valid, valid ? "" : "Field must not be left empty"];
    }
}

export const addressStateValidatorList = [
    ["name", [addressStateValidatorNoOp<string>()]],
    ["address", [addressStateValidatorNoOp<string>()]],
    ["unit", [addressStateValidatorNoOp<string>()]],
    ["city", [addressStateValidatorNoOp<string>()]],
    ["state", [addressStateValidatorNoOp<string>()]],
    ["zip", [addressStateValidatorNoOp<string>()]],
    ["country", [addressStateValidatorNoOp<string>()]],
    ["email", [addressStateValidatorNoOp<string>()]],
    ["ethereumAddress", [addressStateValidatorNoOp<string>()]],
    ["time", [addressStateValidatorNoOp<number>()]],
    ["redeemedSocks", [addressStateValidatorNoOp<number>()]],
]
//TODO:
export function validateAddressState(state: AddressState, validators: [[string, [any]]]): [string, string] | null {
    return null;
}

