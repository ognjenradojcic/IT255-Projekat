import { Product } from "./product.model";
import { User } from "./user.model";

export class Order {
    id: string;
    product: Product;
    total: number;
    user: User;
    constructor(product: Product, total: number, user: User){
        this.product = product;
        this.total = total;
        this.user = user;
    }
}

export enum StatusCode {
    PENDING,
    AWAITING_SHIPPING,
    SHIPPED,
    COMPLETED,
    DECLINED
}