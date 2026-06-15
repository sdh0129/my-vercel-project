const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (in reverse order of dependencies)
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing data...");

  // ==================== [치킨 카테고리] ====================
  // 1. BHC 치킨 강남점
  await prisma.restaurant.create({
    data: {
      name: "BHC 치킨 강남점",
      category: "치킨",
      imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "뿌링클 치킨", price: 21000, description: "BHC 대표 시그니처 단짠 치킨", imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=60" },
          { name: "맛초킹 치킨", price: 21000, description: "달콤 짭조름한 청양고추 간장 치킨", imageUrl: "/images/matchoking.png" },
          { name: "뿌링치즈볼 (5개)", price: 6000, description: "바삭하고 쫄깃한 시그니처 치즈볼", imageUrl: "/images/cheeseballs.png" }
        ]
      }
    }
  });

  // 2. 교촌치킨 압구정점
  await prisma.restaurant.create({
    data: {
      name: "교촌치킨 압구정점",
      category: "치킨",
      imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "교촌 허니콤보", price: 23000, description: "달콤한 허니소스와 바삭한 날개/다리의 만남", imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&auto=format&fit=crop&q=60" },
          { name: "교촌 레드콤보", price: 23000, description: "청양 홍고추의 매콤알싸한 맛", imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=60" },
          { name: "웨지감자", price: 4500, description: "고소하고 포슬포슬한 감자튀김", imageUrl: "https://images.unsplash.com/photo-1600950390317-7b6b7720c18d?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 3. 굽네치킨 신사점
  await prisma.restaurant.create({
    data: {
      name: "굽네치킨 신사점",
      category: "치킨",
      imageUrl: "/images/goobne_logo.png",
      menus: {
        create: [
          { name: "굽네 고추바사삭", price: 21000, description: "매콤바사삭한 굽네 부동의 1위 메뉴", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&auto=format&fit=crop&q=60" },
          { name: "굽네 볼케이노", price: 21000, description: "불맛 활활 나는 화끈한 매운맛", imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&auto=format&fit=crop&q=60" },
          { name: "바게트볼 (1개)", price: 4000, description: "갈릭크림치즈가 듬뿍 들어간 바게트볼", imageUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 4. 푸라닭 청담점
  await prisma.restaurant.create({
    data: {
      name: "푸라닭 청담점",
      category: "치킨",
      imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "블랙알리오 치킨", price: 22000, description: "깊고 진한 간장 소스와 마늘칩의 환상 조화", imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&auto=format&fit=crop&q=60" },
          { name: "고추마요 치킨", price: 22000, description: "매콤한 할라피뇨와 고소한 마요소스의 케미", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&auto=format&fit=crop&q=60" },
          { name: "블랙치즈볼 (5개)", price: 5900, description: "체다와 모짜렐라가 꽉 찬 검은 치즈볼", imageUrl: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // ==================== [피자 카테고리] ====================
  // 1. 도미노피자 청담점
  await prisma.restaurant.create({
    data: {
      name: "도미노피자 청담점",
      category: "피자",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "포테이토 피자 (L)", price: 27900, description: "베스트셀러! 포테이토와 마요네즈의 만남", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
          { name: "블랙타이거 슈림프 (L)", price: 35900, description: "탱글한 블랙타이거 새우와 푸짐한 와규 토핑", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" },
          { name: "코카콜라 1.25L", price: 2500, description: "짜릿하고 시원한 음료", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 2. 피자헛 강남점
  await prisma.restaurant.create({
    data: {
      name: "피자헛 강남점",
      category: "피자",
      imageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "수퍼슈프림 피자 (L)", price: 29900, description: "진한 고기 맛과 신선한 야채가 어우러진 오리지널 피자", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60" },
          { name: "직화불고기 피자 (L)", price: 30900, description: "한국 정통 직화구이 맛의 불고기 토핑", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
          { name: "리치치즈 파스타", price: 7900, description: "진한 미트소스와 치즈가 가득한 스파게티", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 3. 파파존스 삼성점
  await prisma.restaurant.create({
    data: {
      name: "파파존스 삼성점",
      category: "피자",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "수퍼파파스 피자 (L)", price: 28500, description: "파파존스의 시그니처 콤비네이션 피자", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" },
          { name: "존스 페이버릿 피자 (L)", price: 29500, description: "이탈리안 소시지와 6종의 치즈가 듬뿍", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
          { name: "더블초코칩 브라우니", price: 9000, description: "따뜻하고 꾸덕한 악마의 초코 브라우니", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 4. 반올림피자샵 서초점
  await prisma.restaurant.create({
    data: {
      name: "반올림피자샵 서초점",
      category: "피자",
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "반올림 고구마피자 (L)", price: 23900, description: "부드럽고 달콤한 고구마 무스가 듬뿍", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
          { name: "내맘대로 4가지맛 (L)", price: 28900, description: "가장 인기있는 4가지 맛을 한 번에 즐기는 메뉴", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60" },
          { name: "치즈오븐 스파게티", price: 6000, description: "토마토 베이스의 클래식 오븐 치즈 스파게티", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // ==================== [중식 카테고리] ====================
  // 1. 마포 만다린
  await prisma.restaurant.create({
    data: {
      name: "마포 만다린",
      category: "중식",
      imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "정통 유니짜장", price: 7000, description: "잘게 다진 고기와 신선한 춘장을 볶아낸 짜장면", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
          { name: "얼큰 해물짬뽕", price: 9000, description: "신선한 해물과 야채로 불맛을 낸 명품 짬뽕", imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&auto=format&fit=crop&q=60" },
          { name: "겉바속촉 탕수육 (소)", price: 18000, description: "국내산 등심을 깨끗한 기름에 튀겨낸 새콤달콤 탕수육", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 2. 홍콩반점 역삼점
  await prisma.restaurant.create({
    data: {
      name: "홍콩반점 역삼점",
      category: "중식",
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "홍콩 짜장면", price: 6500, description: "불맛 강한 정통 춘장의 대중적인 짜장면", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
          { name: "홍콩 짬뽕", price: 7800, description: "푸짐한 돼지고기와 홍합으로 시원하고 매콤한 짬뽕", imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&auto=format&fit=crop&q=60" },
          { name: "찹쌀 탕수육 (소)", price: 16000, description: "쫄깃한 전분 피를 묻혀 튀겨낸 베스트 메뉴", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 3. 취영루 논현점
  await prisma.restaurant.create({
    data: {
      name: "취영루 논현점",
      category: "중식",
      imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "수제 물만두", price: 9000, description: "특제 비법 피로 만든 부드럽고 촉촉한 대표 물만두", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&auto=format&fit=crop&q=60" },
          { name: "삼선 해물짜장면", price: 9500, description: "고급 해산물이 듬뿍 들어간 삼선 짜장", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
          { name: "바삭 유린기", price: 26000, description: "닭고기 튀김에 아삭한 청양고추와 새콤한 간장소스", imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 4. 동화루 한남점
  await prisma.restaurant.create({
    data: {
      name: "동화루 한남점",
      category: "중식",
      imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "삼선 해물간짜장", price: 10000, description: "즉석에서 볶아 아삭한 야채와 해물이 살아있는 간짜장", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
          { name: "사천 탕수육", price: 22000, description: "매콤하고 알싸한 소스로 볶아낸 사천식 탕수육", imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&auto=format&fit=crop&q=60" },
          { name: "마파두부밥", price: 10000, description: "두부와 다진 돼지고기를 두반장 소스로 볶은 덮밥", imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // ==================== [일식 카테고리] ====================
  // 1. 스시마이우 강남점
  await prisma.restaurant.create({
    data: {
      name: "스시마이우 강남점",
      category: "일식",
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "특선 모듬초밥 (12pcs)", price: 19500, description: "활어, 연어, 참치 등 매일 신선한 네타로 쥔 대표 초밥 세트", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=60" },
          { name: "생연어 초밥 (10pcs)", price: 18000, description: "신선하고 고소한 노르웨이산 생연어 초밥", imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200&auto=format&fit=crop&q=60" },
          { name: "시원한 냉모밀", price: 8500, description: "살얼음 동동 띄운 쯔유 육수에 가쓰오부시 풍미의 모밀", imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 2. 아비꼬 신사점
  await prisma.restaurant.create({
    data: {
      name: "아비꼬 신사점",
      category: "일식",
      imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "100시간 카레라이스", price: 8500, description: "100시간 동안 정성껏 끓여 숙성시킨 일본식 깊은 맛 카레", imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=200&auto=format&fit=crop&q=60" },
          { name: "수제 돈까스 토핑", price: 4800, description: "카레와 찰떡궁합! 바삭바삭한 국산 등심 돈까스", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=60" },
          { name: "허브치킨 카레라이스", price: 10500, description: "부드러운 닭가슴살 슬라이스가 들어간 고소한 카레", imageUrl: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  // 3. 홍대개미 서초점
  await prisma.restaurant.create({
    data: {
      name: "홍대개미 서초점",
      category: "일식",
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60",
      menus: {
        create: [
          { name: "큐브 스테이크 덮밥", price: 12900, description: "특제 소스를 발라 불맛 나게 구워낸 대표 큐브 스테이크 덮밥", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=60" },
          { name: "특제 대창 덮밥", price: 13900, description: "쫄깃하고 고소한 한우대창을 매콤달콤 소스로 졸여낸 별미", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=60" },
          { name: "생연어 덮밥 (사케동)", price: 14900, description: "두툼한 생연어 슬라이스와 생와사비의 깔끔한 조화", imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200&auto=format&fit=crop&q=60" }
        ]
      }
    }
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
