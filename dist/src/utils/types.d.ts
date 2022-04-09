export interface Restaurant {
    cashBalance: number;
    menu: Menu[];
    openingHours: string;
    restaurantName: string;
}
export interface Menu {
    dishName: string;
    price: number;
}
export interface User {
    cashBalance: number;
    id: number;
    name: string;
    purchaseHistory: PurchaseHistory[];
}
export interface PurchaseHistory {
    dishName: string;
    restaurantName: string;
    transactionAmount: number;
    transactionDate: string;
}
