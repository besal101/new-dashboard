export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  arName?: string;
  ruName?: string;
  image: string;
  title?: string;
  description?: string;
  parentCategoryId?: number;
  published: boolean;
  createdAt: Date;
  createdById: number;
  subcategories?: Category[];
};

export type CategoryOptionType = {
  limit?: number;
  page?: number;
};

export type VariationType =
  | "single"
  | "variationbycolor"
  | "variationbysize"
  | "variationbymulti";

export type SpecificationsType = {
  title: string;
  description: string;
};

export type WeightsType = {
  title: string;
  description: string;
};

export type Product = {
  id: number;
  categoryId: number;
  name: string;
  nameAr: string;
  slug: string;
  published: boolean;
  shortDesc: string;
  shortDescAr: string;
  longDesc: string;
  longDescAr: string;
  price: number;
  discountPrice: number;
  badge: string;
  quantity: number;
  weightDimension: WeightsType[];
  weightDimensionAr: WeightsType[];
  specifications: SpecificationsType[];
  specificationsAr: SpecificationsType[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  itemCode: string;
  itemSeries: string;
  variationType: VariationType;
  images: ProductImage[];
  variation?: ProductVariation[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
};

export type ProductImage = {
  id: number;
  productVariationId: number;
  imageUrl: string;
  thumbnailUrl: string;
};

export type ProductVariation = {
  name: string;
  productId: number;
  colorImage?: string;
  images?: string;
  size?: any;
  price: number;
  quantity: number;
  itemCode: string;
};

export type Review = {
  id: number;
  productId: number;
  name: string;
  content: string;
  rating: number;
  createdAt: Date;
};
