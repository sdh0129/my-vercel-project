"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface User {
  id: number;
  email: string;
  name: string;
}

export default function Navbar() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // Listen for custom login/logout events to sync auth status immediately
    window.addEventListener('auth-change', fetchUser);
    return () => window.removeEventListener('auth-change', fetchUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        window.dispatchEvent(new Event('auth-change'));
        router.push('/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 backdrop-blur-md support-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="max-w-6xl w-full mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-rose-500 hover:text-rose-600 transition-colors">
          <span className="text-2xl">🛵</span>
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Vibe Delivery</span>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {!loading && (
            <>
              {user ? (
                <>
                  <span className="hidden sm:inline text-sm text-slate-500">
                    <strong className="text-slate-800 font-semibold">{user.name}</strong>님 안녕하세요!
                  </span>
                  <Link href="/orders" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    내 주문내역
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    로그인
                  </Link>
                  <Link href="/register" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    회원가입
                  </Link>
                </>
              )}
            </>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 flex items-center justify-center bg-rose-50 rounded-full text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <span className="text-lg">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
