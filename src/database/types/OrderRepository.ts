export type OrderRepository = {
    id: number;
    tableId: number;
    productId: number;
    unit_price: number;
    quantity: number;
    total_price: number;
    created_at: number;
    updated_at: number;
    sessionId: number;
};