/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import LegalPage from './components/LegalPage';
import BookPreviewer from './components/BookPreviewer';
import { Product, JournalArticle, ViewState } from './types';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const purchasesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'purchases'));
          const ids = purchasesSnapshot.docs.map(doc => doc.id);
          setPurchasedBookIds(ids);
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      } else {
        setPurchasedBookIds([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const handleOrderPlaced = (orderId: string) => {
    const purchased = [...cartItems];
    setCartItems([]); // Clear cart
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView({ type: 'order-success', orderId, purchasedItems: purchased });
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && view.type !== 'order-success' && view.type !== 'book-preview' && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            isPurchased={purchasedBookIds.includes(view.product.id)}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
            onPreview={(product) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'book-preview', product, isPurchased: purchasedBookIds.includes(product.id) });
            }}
          />
        )}

        {view.type === 'book-preview' && (
          <BookPreviewer 
            product={view.product}
            isPurchased={view.isPurchased || purchasedBookIds.includes(view.product.id)}
            onBack={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'product', product: view.product });
            }}
            onPurchase={() => {
              addToCart(view.product);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'checkout' });
            }}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
                onOrderPlaced={handleOrderPlaced}
            />
        )}

        {view.type === 'order-success' && (
            <OrderSuccess 
                orderId={view.orderId}
                purchasedItems={view.purchasedItems}
                onBack={() => setView({ type: 'home' })}
                onReadBook={(product) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setView({ type: 'book-preview', product, isPurchased: true });
                }}
            />
        )}

        {view.type === 'legal' && (
          <LegalPage 
            page={view.page} 
            onBack={() => setView({ type: 'home' })} 
          />
        )}
      </main>

      {view.type !== 'checkout' && view.type !== 'order-success' && view.type !== 'legal' && view.type !== 'book-preview' && (
        <Footer 
          onLinkClick={handleNavClick} 
          onLegalClick={(page) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'legal', page });
          }}
        />
      )}
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;
