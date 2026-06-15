"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Menu {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  imageUrl: string | null;
  description: string | null;
}

interface Restaurant {
  id: number;
  name: string;
  imageUrl: string | null;
  category: string;
  menus: Menu[];
}

export default function RestaurantDetailClient({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const router = useRouter();
  const { addToCart, forceAddToCart, cartItems } = useCart();

  const handleAddMenu = async (menu: Menu) => {
    // Check authentication status
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (!authRes.ok || !authData.user) {
        alert('음식을 장바구니에 담으려면 먼저 로그인해야 합니다. 로그인 페이지로 이동합니다.');
        router.push('/login');
        return;
      }
    } catch (err) {
      console.error('Auth check error:', err);
      alert('인증 상태를 확인하는 중 오류가 발생했습니다.');
      return;
    }

    const success = addToCart({
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });

    if (!success) {
      const confirmClear = window.confirm(
        '장바구니에는 같은 식당의 메뉴만 담을 수 있습니다.\n기존에 담겨있는 다른 식당의 메뉴를 비우고 이 메뉴를 담으시겠습니까?'
      );
      if (confirmClear) {
        forceAddToCart({
          menuId: menu.id,
          name: menu.name,
          price: menu.price,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        });
        alert('이전 장바구니를 비우고 새로운 메뉴를 담았습니다.');
      }
    } else {
      // Show simple feedback
      alert(`${menu.name}을(를) 장바구니에 담았습니다!`);
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <span>← 식당 목록으로</span>
      </Link>

      {/* Restaurant Header */}
      <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 shadow-md">
        <img
          src={restaurant.imageUrl || '/images/default-restaurant.jpg'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-rose-500 rounded-full text-xs font-bold uppercase tracking-wider">
              {restaurant.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm">
              인기 메뉴와 최고급 재료로 만든 정성 가득한 요리를 지금 즐기세요!
            </p>
          </div>
        </div>
      </div>

      {/* Menu Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">메뉴 목록</h2>
        <span className="text-sm font-medium text-slate-500">총 {restaurant.menus.length}개</span>
      </div>

      {/* Menus List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurant.menus.map((menu) => (
          <div
            key={menu.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex space-x-4 justify-between"
          >
            {/* Menu Info */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{menu.name}</h3>
                {menu.description && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {menu.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-rose-500 text-base">
                  {menu.price.toLocaleString()}원
                </span>
                <button
                  onClick={() => handleAddMenu(menu)}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/10 transition-colors cursor-pointer"
                >
                  장바구니 담기
                </button>
              </div>
            </div>

            {/* Menu Image */}
            {menu.imageUrl && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Cart Button for Mobile */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 sm:hidden">
          <Link
            href="/cart"
            className="flex items-center space-x-2 bg-rose-500 text-white font-bold px-5 py-3 rounded-full shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-colors"
          >
            <span>🛒 장바구니 보기</span>
            <span className="bg-white text-rose-600 text-xs px-2 py-0.5 rounded-full font-black">
              {totalCartCount}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
