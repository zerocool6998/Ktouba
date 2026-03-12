/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  imageUrl: string;
  gallery?: string[];
  features: string[];
  downloadUrl?: string;
  author?: {
    name: string;
    bio: string;
    imageUrl?: string;
  };
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode | string; // Allowing JSX for rich formatting/poems or markdown string
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface Order {
  id?: string;
  customerEmail: string;
  items: {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'checkout' }
  | { type: 'order-success', orderId: string, purchasedItems: Product[] }
  | { type: 'legal', page: 'terms' | 'privacy' | 'refund' }
  | { type: 'book-preview', product: Product, isPurchased: boolean };
