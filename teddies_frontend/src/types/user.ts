import { ProductType } from './product';

export type User = {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  cart_items?: CartItem[];
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type Order = {
  id: number;
  name: string;
  email: string;
  billing_amount: string;
  trackingId: string;
  order_date: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  order_details?: OrderDetail[];
};

enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export type OrderDetail = {
  quantity: number;
  price: number;
  product: ProductType;
  order: Order;
  size: Size;
};

export type CartItem = {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  size: string;
};

export type OrderItem = {
  id: number;
  attributes: {
    quantity: number;
    price: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    size: string;
    product: ProductInOrder;
    order: OrderInOrder;
  };
};

export type OrderInOrder = {
  data: {
    id: number;
    attributes: {
      name: string;
      email: string;
      billing_amount: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      trackingId: string;
      order_date: string;
    };
  };
};

export type ProductInOrder = {
  data: {
    id: number;
    attributes: {
      name: string;
      price: string;
      size: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      category: string;
      description: string;
      no_image: string;
    };
  };
};
