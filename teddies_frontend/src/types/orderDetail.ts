import { Key } from 'react';

export type OrderDetail = {
  id: Key | null | undefined;
  attributes: {
    product: { data: { attributes: { name: string; price: string } } };
    quantity: string;
    size: string;
    order: {
      data: {
        attributes: {
          order_date: string;
          name: string;
          trackingId: string;
        };
      };
    };
  };
};
