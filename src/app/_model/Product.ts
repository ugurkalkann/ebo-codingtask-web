export interface Product{
    ProductID: number;
    Name: string;
    Description: string;
    OrderCount: number;
}

export interface OrderProductRequest{
    ProductID: number;
    UserID: number;
}

export interface OrderProductDetail{
    OrderID: number;
    ProductID: number;
    UserID: number;
    OrderDate: Date;
}