class Address {
    _street: string;
    _city: string;
    _zipCode: string;
    _number: number;

    //Eu preciso de todas as propriedades para criar um endereço
    constructor(street: string, city: string, zipCode: string, number: number) {
        this._street = street;
        this._city = city;
        this._zipCode = zipCode;
        this._number = number;
    
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error('Street is required');
        }
        if (this._city.length === 0) {
            throw new Error('City is required');
        }
        if (this._zipCode.length === 0) {
            throw new Error('ZipCode is required');
        }
        if (!this._number) {
            throw new Error('Number is required');
        }

    }

    toString() {     
        return `${this._street}, ${this._number}, ${this._city}, ${this._zipCode}`;
    }

}