"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  menu: {
    name: string;
  };
}

interface Order {
  id: number;
  totalPrice: number;
  status: string; // PENDING, DELIVERING, COMPLETED
  createdAt: string;
  restaurant: {
    name: string;
    category: string;
    imageUrl: string | null;
  };
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 1. Check user login first
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();

        if (!authRes.ok || !authData.user) {
          router.push('/login');
          return;
        }

        // 2. Fetch orders
        const res = await fetch('/api/orders');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || '주문 내역을 가져오는데 실패했습니다.');
        }

        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold rounded-full">
            주문 접수
          </span>
        );
      case 'DELIVERING':
        return (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold rounded-full">
            배달 중
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold rounded-full">
            배달 완료
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 text-xs font-bold rounded-full">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 text-slate-400">
        주문 내역을 불러오는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">주문 내역</h1>
        <p className="text-xs text-slate-400 mt-1">지금까지 주문하신 리스트를 확인하실 수 있습니다.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400 space-y-4">
          <span className="text-5xl block">📦</span>
          <p className="font-bold text-slate-600">주문 내역이 존재하지 않습니다.</p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/10 transition-colors"
          >
            첫 주문하러 가기
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-4">
                  {order.restaurant.imageUrl && (
                    <img
                      src={order.restaurant.imageUrl}
                      alt={order.restaurant.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 bg-white"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{order.restaurant.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Order Items List */}
              <div className="p-5 divide-y divide-slate-100/50">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-semibold">
                      {item.menu.name} <span className="text-xs text-slate-400 font-normal">x {item.quantity}</span>
                    </span>
                    <span className="text-slate-500">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
              </div>

              {/* Order Footer (Total Price) */}
              <div className="p-5 bg-slate-50/20 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">총 결제 금액</span>
                <span className="font-extrabold text-rose-500 text-base">
                  {order.totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
