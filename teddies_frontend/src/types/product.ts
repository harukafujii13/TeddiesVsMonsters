export type ProductType = {
  id: number;
  attributes: {
    createdAt?: string;
    no_image: boolean;
    name: string;
    price: string;
    publishedAt?: string;
    size: string;
    updatedAt?: string;
    category: CategoryType;
    description?: string;
  };
};

export type CategoryType = 'games' | 'clothe' | 'accessory';

export type SizeType = {
  size: string;
};
