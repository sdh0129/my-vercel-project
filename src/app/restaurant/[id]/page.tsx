import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import RestaurantDetailClient from './RestaurantDetailClient';

export const revalidate = 0; // Disable server-side caching to reflect edits instantly

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: Number(id) },
    include: {
      menus: {
        orderBy: { name: 'asc' },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetailClient restaurant={restaurant} />;
}
