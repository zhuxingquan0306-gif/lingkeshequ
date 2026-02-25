import { useEffect, useRef, useState } from 'react';
import { Star, MapPin, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Provider {
  id: string;
  name: string;
  category: string;
  avatar: string;
  rating: number;
  reviews: number;
  points: number;
  distance: string;
  tags: string[];
  color: string;
}

const providers: Provider[] = [
  {
    id: '1',
    name: '鲜果时光',
    category: '餐饮美食',
    avatar: '鲜',
    rating: 4.9,
    reviews: 328,
    points: 850,
    distance: '0.8km',
    tags: ['有机水果', '当日送达'],
    color: '#00d4aa',
  },
  {
    id: '2',
    name: '正义律师事务所',
    category: '法律服务',
    avatar: '正',
    rating: 4.8,
    reviews: 156,
    points: 1200,
    distance: '2.3km',
    tags: ['免费咨询', '专业团队'],
    color: '#c9a87c',
  },
  {
    id: '3',
    name: '温馨民宿',
    category: '住宿酒店',
    avatar: '温',
    rating: 4.7,
    reviews: 89,
    points: 680,
    distance: '1.5km',
    tags: ['干净整洁', '价格实惠'],
    color: '#8b5cf6',
  },
  {
    id: '4',
    name: '智慧学堂',
    category: '教育培训',
    avatar: '智',
    rating: 4.9,
    reviews: 245,
    points: 920,
    distance: '0.5km',
    tags: ['名师授课', '小班教学'],
    color: '#00d4aa',
  },
  {
    id: '5',
    name: '健康之家诊所',
    category: '医疗健康',
    avatar: '健',
    rating: 4.6,
    reviews: 412,
    points: 1100,
    distance: '1.2km',
    tags: ['24小时', '医保定点'],
    color: '#c9a87c',
  },
  {
    id: '6',
    name: '贴心家政',
    category: '家政服务',
    avatar: '贴',
    rating: 4.8,
    reviews: 178,
    points: 750,
    distance: '3.0km',
    tags: ['持证上岗', '保险保障'],
    color: '#8b5cf6',
  },
  {
    id: '7',
    name: '数码维修站',
    category: '数码维修',
    avatar: '数',
    rating: 4.7,
    reviews: 523,
    points: 640,
    distance: '0.9km',
    tags: ['快速维修', '质保三月'],
    color: '#00d4aa',
  },
  {
    id: '8',
    name: '美丽发艺',
    category: '美容美发',
    avatar: '美',
    rating: 4.5,
    reviews: 267,
    points: 580,
    distance: '1.8km',
    tags: ['时尚造型', '优惠套餐'],
    color: '#c9a87c',
  },
];

const Providers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.provider-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[#c9a87c]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#00d4aa]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#c9a87c]/20 mb-6">
            <Shield className="w-4 h-4 text-[#c9a87c]" />
            <span className="text-sm text-white/70">社区积分认证</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            服务商<span className="text-gold">星系</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            经过社区积分认证的可信服务商，为您提供优质本地生活服务
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="provider-card group relative"
              onMouseEnter={() => setHoveredId(provider.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  hoveredId === provider.id
                    ? 'border-[#c9a87c]/50 bg-[#0f1419] scale-105 -translate-y-2'
                    : 'border-white/10 bg-[#0a0f1a]/80'
                }`}
                style={{
                  boxShadow: hoveredId === provider.id ? `0 0 40px ${provider.color}30` : 'none',
                }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    hoveredId === provider.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${provider.color}20 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-medium"
                      style={{
                        backgroundColor: `${provider.color}20`,
                        color: provider.color,
                        boxShadow: `0 0 20px ${provider.color}30`,
                      }}
                    >
                      {provider.avatar}
                    </div>

                    {/* Points Badge */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#c9a87c]/20">
                      <TrendingUp className="w-3 h-3 text-[#c9a87c]" />
                      <span className="text-xs text-[#c9a87c]">{provider.points}</span>
                    </div>
                  </div>

                  {/* Name & Category */}
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#c9a87c] transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-white/50 mb-3">{provider.category}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#c9a87c] fill-[#c9a87c]" />
                      <span className="text-sm text-white">{provider.rating}</span>
                    </div>
                    <span className="text-xs text-white/40">({provider.reviews}评价)</span>
                    <span className="text-xs text-white/40">·</span>
                    <div className="flex items-center gap-1 text-white/40">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{provider.distance}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md"
                        style={{
                          backgroundColor: `${provider.color}15`,
                          color: provider.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/40">查看详情</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        hoveredId === provider.id
                          ? 'text-[#c9a87c] translate-x-1'
                          : 'text-white/30'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c9a87c]/30 text-[#c9a87c] hover:bg-[#c9a87c]/10 transition-all duration-300">
            查看全部服务商
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Providers;
