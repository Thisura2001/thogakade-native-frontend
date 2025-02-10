export default class IItem {
    id:string
    name:string
    price:string
    quantity:string

    constructor(id:string, name:string, price:string, quantity:string){
        this.id=id;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
    }
}