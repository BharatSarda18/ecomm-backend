export class CreateOrderDto {
    items: any[];

    totalAmount: number;

    totalItems: number;

    user: string;

    paymentMethod: string;

    status: string;

    selectedAddress:Record<string, any>;
}
