import React from "react"

import "./utils"
import { AddressState, AddressStateValidatorKeyPair, addressStateValidatorNotEmptyString } from "./utils";
export default class AddressForm extends React.Component {
    state: AddressState;
    public constructor(props:Readonly<{}>) {
        super(props);
        this.state = {
            name: new AddressStateValidatorKeyPair<string>("name", ""),
            address: new AddressStateValidatorKeyPair<string>("address", ""),
            unit: new AddressStateValidatorKeyPair<string>("unit", ""),
            city: new AddressStateValidatorKeyPair<string>("city", ""),
            zip: new AddressStateValidatorKeyPair<string>("zip", ""),
            state: new AddressStateValidatorKeyPair<string>("unit", ""),
            country: new AddressStateValidatorKeyPair<string>("unit", ""),
            email: new AddressStateValidatorKeyPair<string>("unit", ""),
        }
        this.state.name.addValidator(addressStateValidatorNotEmptyString);
        this.state.address.addValidator(addressStateValidatorNotEmptyString);
        this.state.city.addValidator(addressStateValidatorNotEmptyString);
        this.state.country.addValidator(addressStateValidatorNotEmptyString);
        this.state.email.addValidator(addressStateValidatorNotEmptyString);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var prop = this.state[name as keyof AddressState];
        this.setState({[name]: prop.setValue(() => value)});
      }
    render() {
        return (
            <div>
                <form>
                    <input onChange={this.handleInputChange} name="name" value={this.state.name.getValue()} aria-placeholder="" aria-label="Name" placeholder="Name" />
                    <input onChange={this.handleInputChange} name="address" value={this.state.address.getValue()} aria-placeholder="" aria-label="Address" placeholder="Address" />
                    <input onChange={this.handleInputChange} name="unit" value={this.state.unit.getValue()} aria-placeholder="" aria-label="Unit" placeholder="Unit" />
                    <input onChange={this.handleInputChange} name="city" value={this.state.city.getValue()} aria-placeholder="" aria-label="City" placeholder="City" />
                    <input onChange={this.handleInputChange} name="zip" value={this.state.zip.getValue()} aria-placeholder="" aria-label="Zip Code" placeholder="Zip Code" />
                    <input onChange={this.handleInputChange} name="state" value={this.state.state.getValue()} aria-placeholder="" aria-label="State" placeholder="State" />
                    <input onChange={this.handleInputChange} name="country" value={this.state.country.getValue()} aria-placeholder="" aria-label="Country" placeholder="Country" />
                    <input onChange={this.handleInputChange} name="email" value={this.state.email.getValue()} aria-placeholder="" aria-label="Email" placeholder="Email" />
                    <input onChange={this.handleInputChange} type="submit" />
                </form>
            </div>
        );
    }
}