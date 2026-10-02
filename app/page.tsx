"use client";

import React, { useState } from 'react';

type View = 'home' | 'login' | 'register' | 'dashboard' | 'details';
type Service = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  seller: string;
  deliveryTime: string;
  description: string;
  image: string;
};

type Order = {
  id: number;
  service: string;
  client: string;
  status: string;
  amount: number;
};

const initialServices: Service[] = [
  {
    id: 1,
    title: 'تصميم واجهات المستخدم وتجربة المستخدم UI/UX لتطبيقات الويب',
    category: 'تصميم جرافيك',
    price: 25,
    rating: 4.9,
    reviewsCount: 120,
    seller: 'أحمد المهندس',
    deliveryTime: '3 أيام',
    description:
      'تصميم واجهات احترافية ومبتكرة تتناسب مع هوية مشروعك الرقمي باستخدام أحدث المعايير العالمية.',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'برمجة وتطوير مواقع الويب باستخدام Next.js و Tailwind CSS',
    category: 'برمجة وتطوير',
    price: 50,
    rating: 5.0,
    reviewsCount: 85,
    seller: 'سارة التقنية',
    deliveryTime: '5 أيام',
    description:
      'تطوير مواقع ويب سريعة، آمنة، ومتوافقة تماماً مع محركات البحث SEO مع دعم كامل للغة العربية RTL.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'كتابة وترجمة المقالات الحصرية وتحسين محركات البحث SEO',
    category: 'كتابة وترجمة',
    price: 15,
    rating: 4.8,
    reviewsCount: 230,
    seller: 'خالد المحترف',
    deliveryTime: '2 أيام',
    description:
      'صياغة محتوى حصري وجذاب يساهم في رفع ظهور موقعك في نتائج محركات البحث وزيادة المبيعات.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
  },
];

const initialOrders: Order[] = [
  { id: 101, service: 'برمجة وتطوير مواقع الويب', client: 'محمد أحمد', status: 'قيد التنفيذ', amount: 50 },
  { id: 102, service: 'تصميم واجهة متجر إلكتروني', client: 'سارة علي', status: 'مكتمل', amount: 25 },
];

const statItems = [
  { label: 'خدمات منشورة', value: '15.4K' },
  { label: 'مستقلين محترفين', value: '4.8K' },
  { label: 'عمليات ناجحة', value: '92%' },
  { label: 'متوسط التقييم', value: '4.9/5' },
];

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(initialServices[0]);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [authRole, setAuthRole] = useState<'buyer' | 'seller'>('buyer');
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('برمجة وتطوير');
  const [newDesc, setNewDesc] = useState('');
  const [isOrderedSuccess, setIsOrderedSuccess] = useState(false);

  const openDetails = (service: Service) => {
    setSelectedService(service);
    setCurrentView('details');
  };

  const handleOrderNow = (service: Service) => {
    setSelectedService(service);
    setIsOrderedSuccess(true);
    setOrders((prev) => [
      {
        id: Date.now(),
        service: service.title,
        client: 'أنت',
        status: 'قيد التنفيذ',
        amount: service.price,
      },
      ...prev,
    ]);
    window.setTimeout(() => setIsOrderedSuccess(false), 2200);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !newPrice || !newDesc.trim()) {
      return;
    }

    const newService: Service = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice),
      rating: 5.0,
      reviewsCount: 1,
      seller: 'أنت (المستقل)',
      deliveryTime: '4 أيام',
      description: newDesc.trim(),
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    };

    setServices((prev) => [newService, ...prev]);
    setNewTitle('');
    setNewPrice('');
    setNewCategory('برمجة وتطوير');
    setNewDesc('');
    setCurrentView('dashboard');
  };

  const renderHomePage = () => (
    <main>
      <section className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 text-center lg:text-right">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100">
                منصة موثوقة لبناء أعمالك الرقميّة
              </span>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                طور أعمالك واعرض مهاراتك مع أفضل المستقلين
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-indigo-100 lg:mx-0">
                ابحث عن الخبرات المناسبة، اطلب الخدمات، أو اعرض مهاراتك وابدأ بتحقيق دخل إضافي من خلال منصة احترافية وتفاعلية.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
                >
                  ابدأ كصاحب خدمة
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-white p-5 text-slate-900 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">مستوى الطلب</p>
                    <h3 className="text-2xl font-black text-slate-900">مشروع متقدم</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    متاح الآن
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">إيرادات هذا الشهر</p>
                    <p className="mt-2 text-3xl font-black text-indigo-700">8,420 ر.س</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-indigo-50 p-3">
                      <p className="text-slate-500">طلبات جديدة</p>
                      <p className="mt-1 text-xl font-extrabold text-indigo-700">124</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-3">
                      <p className="text-slate-500">متابعون</p>
                      <p className="mt-1 text-xl font-extrabold text-amber-600">3.2K</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">معدل الإنجاز</span>
                      <span className="font-bold text-indigo-700">94%</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-indigo-100">
                      <div className="h-2.5 w-[94%] rounded-full bg-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {statItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm">
                <p className="text-3xl font-black text-indigo-700">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-indigo-600">خدمات مختارة</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">اكتشف أفضل الخدمات الرقمية</h2>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 md:inline-flex"
            >
              عرض جميع الخدمات
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={service.image} alt={service.title} className="h-52 w-full object-cover" />

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>★</span>
                      <span className="text-sm font-bold text-slate-700">{service.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 line-clamp-3">{service.title}</h3>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{service.seller}</span>
                    <span>{service.deliveryTime}</span>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">{service.description}</p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500">من</p>
                      <p className="text-2xl font-black text-indigo-700">{service.price} ر.س</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetails(service)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                      >
                        التفاصيل
                      </button>
                      <button
                        onClick={() => handleOrderNow(service)}
                        className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        طلب الآن
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold text-indigo-600">كيف تعمل المنصة؟</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">خطوات بسيطة تبدأ من دقيقة واحدة</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'أنشئ حسابك', text: 'سجل بياناتك في دقائق وجاهز لطلب أو عرض الخدمات.' },
              { step: '2', title: 'اختر الخدمة', text: 'تصفح الخدمات المناسبة لمتطلباتك وراجع تفاصيل البائع.' },
              { step: '3', title: 'ابدأ المشروع', text: 'تواصل مع صاحب الخدمة وابدأ تنفيذ المشروع بثقة كاملة.' },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-black text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-indigo-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
          <p className="text-sm font-bold text-indigo-200">هل أنت جاهز؟</p>
          <h2 className="mt-3 text-3xl font-black">ابدأ اليوم في بناء مشروعك الرقمي</h2>
          <p className="mt-4 text-indigo-100">انضم إلى آلاف المستخدمين الذين يعتمدون على خدماتنا لعرض أعمالهم وتحقيق النجاح.</p>
          <button
            onClick={() => setCurrentView('register')}
            className="mt-8 rounded-xl bg-white px-6 py-3 text-sm font-black text-indigo-700 transition hover:bg-indigo-50"
          >
            تسجيل حساب مجاني
          </button>
        </div>
      </section>
    </main>
  );

  const renderAuthPage = (mode: 'login' | 'register') => (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-indigo-900 to-indigo-700 p-12 text-white lg:block">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-200">مرحباً بك</p>
                <h2 className="mt-4 text-4xl font-black">منصة خدماتي</h2>
              </div>

              <div className="space-y-5 text-indigo-100">
                <p>تواصل مع أفضل الخبرات، أو اعرض خدماتك في بيئة احترافية وآمنة.</p>
                <div className="grid gap-3 text-sm">
                  <div className="rounded-xl bg-white/5 p-3">✓ خدمات موثوقة ومراجعة دقيقة</div>
                  <div className="rounded-xl bg-white/5 p-3">✓ دعم فني متواصل طوال الوقت</div>
                  <div className="rounded-xl bg-white/5 p-3">✓ دفع آمن وسهل للطلبات</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-indigo-600">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</p>
                <h3 className="mt-1 text-3xl font-black text-slate-900">
                  {mode === 'login' ? 'مرحباً بعودتك' : 'ابدأ رحلتك الآن'}
                </h3>
              </div>
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setAuthRole('buyer')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${authRole === 'buyer' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'}`}
                >
                  مشتري
                </button>
                <button
                  onClick={() => setAuthRole('seller')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${authRole === 'seller' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'}`}
                >
                  بائع
                </button>
              </div>
            </div>

            <form className="space-y-5">
              {mode === 'register' && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">كلمة المرور</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setCurrentView('dashboard')}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
              <button
                onClick={() => setCurrentView(mode === 'login' ? 'register' : 'login')}
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                {mode === 'login' ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const renderDashboard = () => (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-indigo-600">لوحة التحكم</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">مرحباً بك في مساحة العمل</h2>
          </div>
          <button
            onClick={() => setCurrentView('home')}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-indigo-200 hover:text-indigo-600"
          >
            العودة إلى الرئيسية
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'إجمالي الطلبات', value: '128', accent: 'bg-indigo-600' },
            { label: 'الأرباح', value: '12,540 ر.س', accent: 'bg-emerald-500' },
            { label: 'تقييمك', value: '4.9 / 5', accent: 'bg-amber-500' },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 h-2.5 w-14 rounded-full ${item.accent}`} />
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">إضافة خدمة جديدة</h3>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">معلّق للنشر</span>
            </div>

            <form onSubmit={handleAddService} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">عنوان الخدمة</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  type="text"
                  placeholder="مثال: تصميم شعار احترافي"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">السعر</label>
                  <input
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    type="number"
                    min="1"
                    placeholder="100"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">الفئة</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                  >
                    <option>برمجة وتطوير</option>
                    <option>تصميم جرافيك</option>
                    <option>كتابة وترجمة</option>
                    <option>تسويق رقمي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">وصف الخدمة</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={5}
                  placeholder="اكتب وصفاً واضحاً للخدمة التي ستقدمها..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
              >
                نشر الخدمة
              </button>
            </form>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">الطلبات الأخيرة</h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{orders.length} طلب</span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{order.service}</p>
                      <p className="mt-1 text-sm text-slate-500">العميل: {order.client}</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-700">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500">القيمة</span>
                    <span className="font-black text-slate-900">{order.amount} ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );

  const renderDetailsPage = () => {
    if (!selectedService) return null;

    return (
      <main className="bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <img src={selectedService.image} alt={selectedService.title} className="h-[400px] w-full rounded-[1.5rem] object-cover" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {selectedService.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <span>★</span>
                  <span className="text-sm font-bold text-slate-700">{selectedService.rating}</span>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-slate-900">{selectedService.title}</h2>
                <p className="mt-3 text-slate-600">{selectedService.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p>البائع</p>
                  <p className="mt-2 font-black text-slate-900">{selectedService.seller}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p>التسليم</p>
                  <p className="mt-2 font-black text-slate-900">{selectedService.deliveryTime}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-5">
                <p className="text-sm text-slate-500">السعر</p>
                <p className="mt-2 text-4xl font-black text-indigo-700">{selectedService.price} ر.س</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleOrderNow(selectedService)}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
                >
                  طلب الخدمة
                </button>
                <button
                  onClick={() => setCurrentView('home')}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                >
                  العودة للصفحة الرئيسية
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <button onClick={() => setCurrentView('home')} className="text-2xl font-black tracking-tight text-indigo-600">
              خدماتي<span className="text-slate-900">.</span>
            </button>
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <button onClick={() => setCurrentView('home')} className="transition hover:text-indigo-600">الرئيسية</button>
              <button onClick={() => setCurrentView('dashboard')} className="transition hover:text-indigo-600">لوحة التحكم</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('login')} className="text-sm font-semibold text-slate-700 transition hover:text-indigo-600">
              تسجيل الدخول
            </button>
            <button onClick={() => setCurrentView('register')} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              حساب جديد
            </button>
          </div>
        </div>
      </header>

      {isOrderedSuccess && (
        <div className="fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg">
          تم تقديم الطلب بنجاح
        </div>
      )}

      {currentView === 'home' && renderHomePage()}
      {currentView === 'login' && renderAuthPage('login')}
      {currentView === 'register' && renderAuthPage('register')}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'details' && renderDetailsPage()}
    </div>
  );
}
