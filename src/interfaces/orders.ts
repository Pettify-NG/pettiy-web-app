export interface OrderItem {
  product: any;
  quantity: number;
  price: number;
  totalPrice: number;
  type: "pet" | "accessory";
  status: "pending" | "shipped" | "delivered" | "canceled";
  _id: string;
}
  
export interface SubOrder {
    seller: string;
    items: OrderItem[];
    subTotalAmount: number;
    status: "pending" | "paid" | "failed";
    _id: string;
}
  
export default interface IOrder {
  uuid: string;
  _id: string;
  buyerEmail: string;
  deliveryAddress: string;
  selectedLocation: string;
  buyer: string;
  totalAmount: number;
  status: "pending" | "paid" | "failed";
  currency: string;
  createdAt: string;
  subOrders: SubOrder[];
  totalAmountForSeller: number;
}
  
export interface OrdersResponse {
    orders: IOrder[];
}
  