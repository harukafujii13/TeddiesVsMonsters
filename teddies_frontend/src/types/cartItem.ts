import { ProductType } from './product';

export type CartItemType = {
  id: number;
  attributes: {
    createdAt?: string;
    publishedAt?: string;
    updatedAt?: string;
    quantity: number;
    product?: { data: ProductType };
    size?: string;
  };
};

export type CheckoutModalProps = {
  cartItems: CartItemType[];
};
