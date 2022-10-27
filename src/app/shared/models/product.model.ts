export class Product {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    category?: string;
    price?: number;
    constructor(name?: string, description?: string, image?: string, price?: number){
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = this.category;
        this.price = price;
    }
}

export class Option{
    name: string;
    price: number;
}