export default class OrderItem {
    _id: string;
    _description: string;
    _price: number;
    _quantity: number;
  
    constructor(id: string, description: string, price: number, quantity: number) {
        this._id = id;
        this._description = description;
        this._price = price;
        this._quantity = quantity;
    }
}