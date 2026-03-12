/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Design', 'Technology'];

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            id: doc.id,
            name: data.title,
            tagline: '',
            description: data.description,
            price: data.price,
            category: 'Design', // Default or fetch from data if available
            imageUrl: data.coverUrl,
            features: [],
            author: {
              name: data.author,
              bio: ''
            }
          } as Product);
        });

        if (fetchedProducts.length === 0) {
          // Database is empty, use local constants
          // We do not seed here to avoid "Permission Denied" errors for unauthenticated users
          setProducts(PRODUCTS);
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
        // Fallback to local constants if error (e.g. offline/permission)
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  if (loading) {
    return (
      <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB] min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-[#2C2A26] font-serif text-xl">Loading Collection...</div>
      </section>
    );
  }

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">The Collection</h2>
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-[#D6D1C7]/50 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-[#2C2A26] text-[#2C2A26]' 
                    : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid */}
        {filteredProducts.length === 1 ? (
          <div className="flex justify-center">
            <div className="w-full md:max-w-[calc((100%-2rem)/2)] lg:max-w-[calc((100%-4rem)/3)]">
              <ProductCard product={filteredProducts[0]} onClick={onProductClick} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
