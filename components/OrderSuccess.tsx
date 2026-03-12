import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface OrderSuccessProps {
  orderId: string;
  purchasedItems: Product[];
  onBack: () => void;
  onReadBook: (product: Product) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderId, purchasedItems, onBack, onReadBook }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center animate-fade-in-up">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="w-16 h-16 text-[#2C2A26]" />
        </div>
        <h1 className="font-serif text-4xl mb-4 text-[#2C2A26]">Thank you.</h1>
        <p className="text-[#5D5A53] mb-8">
          Your order has been received. You can now access your digital books.
        </p>
        <div className="bg-white p-6 border border-[#D6D1C7] mb-8 text-left">
          <p className="text-sm text-[#A8A29E] uppercase tracking-widest mb-2">Order Reference</p>
          <p className="font-mono text-lg text-[#2C2A26]">{orderId}</p>
        </div>
        
        {purchasedItems.length > 0 && (
          <div className="mb-8 space-y-4">
            <h3 className="font-serif text-xl mb-4 text-[#2C2A26]">Your Digital Books</h3>
            {purchasedItems.map(book => (
              <button
                key={book.id}
                onClick={() => onReadBook(book)}
                className="w-full bg-[#2C2A26] text-[#F5F2EB] px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#1A1917] transition-colors"
              >
                Read {book.name}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full bg-transparent border border-[#2C2A26] text-[#2C2A26] px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#2C2A26] hover:text-[#F5F2EB] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
