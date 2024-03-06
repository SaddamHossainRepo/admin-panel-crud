export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export enum CouponType {
  FIXED = "fixed",
  PERCENTAGE = "percentage",
  FREE_SHIPPING = "free_shipping",
}

export enum ProductType {
  Simple = "simple",
  Variable = "variable",
}
export enum StoreNoticePriorityType {
  High = "high",
  Medium = "medium",
  Low = "low",
}
export enum StoreNoticeType {
  all_vendor = "all_vendor",
  specific_vendor = "specific_vendor",
  all_shop = "all_shop",
  specific_shop = "specific_shop",
}

export enum PaymentGateway {
  STRIPE = "STRIPE",
  COD = "CASH_ON_DELIVERY",
  CASH = "CASH",
  FULL_WALLET_PAYMENT = "FULL_WALLET_PAYMENT",
  PAYPAL = "PAYPAL",
  RAZORPAY = "RAZORPAY",
  MOLLIE = "MOLLIE",
  PAYSTACK = "PAYSTACK",
  BITPAY = "BITPAY",
  COINBASE = "COINBASE",
}

export enum ProductStatus {
  Publish = "publish",
  Draft = "draft",
  UnderReview = "under_review",
  Approved = "approved",
  UnPublish = "unpublish",
  Rejected = "rejected",
}
export enum WithdrawStatus {
  Approved = "APPROVED",
  Pending = "PENDING",
  OnHold = "ON_HOLD",
  Rejected = "REJECTED",
  Processing = "PROCESSING",
}

export enum ShippingType {
  Fixed = "fixed",
  Percentage = "percentage",
  Free = "free_shipping",
}

export enum AddressType {
  Billing = "billing",
  Shipping = "shipping",
}
export enum RefundPolicyTarget {
  vendor = "vendor",
  customer = "customer",
}
export enum RefundPolicyStatus {
  Approved = "approved",
  Pending = "pending",
}

export interface GoogleMapLocation {
  lat?: number | string;
  lng?: number | string;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
  formatted_address?: string;
}

export type QueryOptionsType = {
  page?: number;
  name?: string;
  shop_id?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export enum OrderStatus {
  PENDING = "order-pending",
  PROCESSING = "order-processing",
  COMPLETED = "order-completed",
  CANCELLED = "order-cancelled",
  REFUNDED = "order-refunded",
  FAILED = "order-failed",
  AT_LOCAL_FACILITY = "order-at-local-facility",
  OUT_FOR_DELIVERY = "order-out-for-delivery",
}

export enum FlashSaleType {
  PERCENTAGE = "percentage",
  FIXED_RATE = "fixed_rate",
  DEFAULT = "percentage",
  // WALLET_POINT_GIFT = 'wallet_point_gift',
  // FREE_SHIPPING = 'free_shipping',
}

export enum PaymentStatus {
  PENDING = "payment-pending",
  PROCESSING = "payment-processing",
  SUCCESS = "payment-success",
  FAILED = "payment-failed",
  REVERSAL = "payment-reversal",
  COD = "payment-cash-on-delivery",
}

export interface NameAndValueType {
  name: string;
  value: string;
}
export enum Permission {
  SuperAdmin = "super_admin",
  StoreOwner = "store_owner",
  Staff = "staff",
  Customer = "customer",
}

export interface GetParams {
  slug: string | number;
}

export interface QueryOptions {
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: string;
  sortType?: "asc" | "desc";
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  permissions: string[];
  role: string;
}

export interface Attachment {
  thumbnail: string;
  original: string;
  id?: string;
}

export interface Product {
  id: number;
  categoryId: number;
  subCategoryId: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string;
  video: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  Category: Category;
  SubCategory: SubCategory;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  bio?: string;
  born?: string;
  translated_languages: string[];
  death?: string;
  id: string;
  is_approved?: boolean;
  language?: string;
  name: string;
  quote?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Author {
  bio?: string;
  born?: string;
  translated_languages: string[];
  death?: string;
  id: string;
  is_approved?: boolean;
  language?: string;
  name: string;
  quote?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAuthorInput {
  bio?: string;
  born?: string;
  death?: string;
  is_approved?: boolean;
  language?: string;
  name: string;
  quote?: string;
  shop_id?: string;
}

export interface AuthorQueryOptions extends QueryOptions {
  type: string;
  name: string;
  is_approved?: boolean;
}

export interface AuthorPaginator extends PaginatorInfo<Author> {}
