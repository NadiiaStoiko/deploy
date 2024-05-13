export interface ISaleProduct {
    id: number;
    name?: string;
    itemCode?: string;
    description: string;
    heading: string;
    discount: number;
    price: number;
    total: number;
    quantity: number;
    rowIndex: number;
    productId: number;
    unitId: number;
    vatRateId: number;
    isHeading?: boolean;
}
