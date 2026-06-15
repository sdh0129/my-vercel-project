import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// 1. Create a new order (POST)
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: '유효하지 않은 세션입니다.' }, { status: 401 });
    }

    const { restaurantId, items, totalPrice } = await request.json();

    if (!restaurantId || !items || items.length === 0 || !totalPrice) {
      return NextResponse.json({ error: '잘못된 주문 정보입니다.' }, { status: 400 });
    }

    // Run order creation and items creation inside a transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      // Create Order master
      const order = await tx.order.create({
        data: {
          userId: payload.userId,
          restaurantId: Number(restaurantId),
          totalPrice: Number(totalPrice),
          status: 'PENDING',
        },
      });

      // Create Order items
      const orderItemsData = items.map((item: any) => ({
        orderId: order.id,
        menuId: Number(item.menuId),
        quantity: Number(item.quantity),
        price: Number(item.price), // Lock-in price at order time
      }));

      await tx.orderItem.createMany({
        data: orderItemsData,
      });

      return order;
    });

    return NextResponse.json({
      message: '주문이 완료되었습니다.',
      order: newOrder,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: '주문 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 2. Fetch all orders for current user (GET)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: '유효하지 않은 세션입니다.' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        restaurant: {
          select: { name: true, category: true, imageUrl: true },
        },
        orderItems: {
          include: {
            menu: {
              select: { name: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: '주문 내역 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
