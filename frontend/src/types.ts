export interface Category { category_id: number; category_name: string; }
export interface Customer { customer_id: number; name: string; address: string; contact: number; age: number; }
export interface Product { product_id: number; category: number; product_name: string; manu_date: string; exp_date: string; price: number; }
export interface Order { order_id: number; customer: number; quantity: number; order_date: string; }
export interface OrderItem { order_item_id: number; order: number; product: number; customer: number; order_date: string; }