"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart, restaurantName, restaurantId } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    setError('');
    setLoading(true);

    try {
      // 1. Check if user is logged in
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (!authRes.ok || !authData.user) {
        alert('주문하시려면 먼저 로그인해 주세요.');
        router.push('/login');
        return;
      }

      // 2. Submit order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          items: cartItems.map(item => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || '주문 처리 중 오류가 발생했습니다.');
      }

      // 3. Clear cart and redirect
      clearCart();
      alert('주문이 성공적으로 완료되었습니다!');
      router.push('/orders');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md w-full mx-auto my-16 text-center space-y-6 py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <span className="text-6xl block">🛒</span>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-800">장바구니가 비어 있습니다.</h1>
          <p className="text-sm text-slate-400">
            맛있는 요리를 찾아 장바구니에 담아보세요!
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-500/10 transition-colors"
        >
          식당 구경하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">장바구니</h1>
          <p className="text-xs text-rose-500 font-semibold mt-1">🏠 {restaurantName}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
        >
          전체 비우기
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Cart List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
        {cartItems.map((item) => (
          <div key={item.menuId} className="p-5 flex items-center justify-between space-x-4">
            {/* Info */}
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
              <p className="text-xs font-bold text-rose-500">
                {(item.price * item.quantity).toLocaleString()}원
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Quantity Changer */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => updateQuantity(item.menuId, item.quantity - 1)}
                  className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-slate-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.menuId, item.quantity + 1)}
                  className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition-colors cursor-pointer text-xs"
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item.menuId)}
                className="text-slate-300 hover:text-rose-500 transition-colors text-xs font-bold cursor-pointer"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center text-sm font-medium text-slate-400">
          <span>주문 금액</span>
          <span className="text-slate-700">{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center text-sm font-medium text-slate-400">
          <span>배달 팁</span>
          <span className="text-slate-700">0원 (무료 배달 이벤트!)</span>
        </div>
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
          <span className="font-bold text-slate-800 text-base">총 결제 금액</span>
          <span className="font-extrabold text-rose-500 text-xl">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* Order Button */}
      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 hover:from-rose-600 hover:to-orange-600 focus:outline-none transition-all disabled:opacity-50 cursor-pointer text-center"
      >
        {loading ? '주문 처리 중...' : '주문하기'}
      </button>
    </div>
  );
}
