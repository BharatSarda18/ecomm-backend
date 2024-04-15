export declare class CreateOrderDto {
    items: string[];
    totalAmount: number;
    totalItems: number;
    user: string;
    paymentMethod: string;
    status: string;
    selectedAddress: Record<string, any>;
}
