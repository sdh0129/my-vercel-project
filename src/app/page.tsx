import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Disable caching so new data shows immediately

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category || '';

  // Fetch filtered or all restaurants from database
  const restaurants = await prisma.restaurant.findMany({
    where: selectedCategory ? { category: selectedCategory } : undefined,
    orderBy: { name: 'asc' },
  });

  const categories = ['전체', '치킨', '피자', '중식', '일식'];

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 to-orange-500 text-white p-8 sm:p-12 shadow-lg shadow-rose-500/10">
        <div className="max-w-md space-y-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
            Vibe Delivery
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            맛있는 요리를 클릭 한 번으로 배달해 드립니다.
          </h1>
          <p className="text-rose-100 text-sm sm:text-base">
            BHC 치킨, 도미노 피자, 만다린 등 가장 핫한 맛집들을 로컬 환경에서 바로 주문하세요!
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">오늘 무엇을 먹을까요?</h2>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isSelected =
              (cat === '전체' && !selectedCategory) || cat === selectedCategory;
            const href = cat === '전체' ? '/' : `/?category=${cat}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">추천 맛집</h2>
          <span className="text-xs font-semibold text-slate-400">총 {restaurants.length}곳</span>
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400">
            <span className="text-4xl block mb-2">🍽️</span>
            해당 카테고리의 식당이 존재하지 않습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((rest) => (
              <div
                key={rest.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={rest.imageUrl || '/images/default-restaurant.jpg'}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                    {rest.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-rose-500 transition-colors">
                      {rest.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">최소 배달 시간 20-30분</p>
                  </div>

                  <Link
                    href={`/restaurant/${rest.id}`}
                    className="w-full py-2.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-100 text-slate-600 font-bold text-sm rounded-xl text-center transition-colors block"
                  >
                    메뉴 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
