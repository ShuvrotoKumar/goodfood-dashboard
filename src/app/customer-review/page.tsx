"use client";
import { useMemo, useState } from "react";
import { SummaryInsights, type SummaryData } from "@/components/reviews/SummaryInsights";
import { ReviewsFilters, type ReviewsFilterValue } from "@/components/reviews/ReviewsFilters";
import { ReviewCard, type Review } from "@/components/reviews/ReviewCard";
import { ReplyModal } from "@/components/reviews/ReplyModal";
import { AnalyticsGrid } from "@/components/reviews/AnalyticsGrid";

const seedReviews: Review[] = [
  { id: "r1", customer: "John Doe", rating: 5, date: new Date().toISOString(), text: "The food was amazing and delivery was quick!", item: "Chicken Biryani", order: "12345" },
  { id: "r2", customer: "Sarah Lee", rating: 2, date: new Date(Date.now()-2*86400000).toISOString(), text: "Burger was cold on arrival, not satisfied.", item: "Beef Burger", order: "12312" },
  { id: "r3", customer: "Alex Kim", rating: 4, date: new Date(Date.now()-5*86400000).toISOString(), text: "Loved the pizza, would order again. Packaging could be improved.", item: "Margherita Pizza", order: "12288" },
  { id: "r4", customer: "Priya Singh", rating: 3, date: new Date(Date.now()-8*86400000).toISOString(), text: "Decent taste but delivery was late by 20 minutes.", item: "Veg Noodles", order: "12270" },
  { id: "r5", customer: "Mike Chen", rating: 5, date: new Date(Date.now()-1*86400000).toISOString(), text: "Super tasty and fresh. Driver was polite.", item: "Grilled Chicken", order: "12367" },
  { id: "r6", customer: "Ana Gomez", rating: 1, date: new Date(Date.now()-12*86400000).toISOString(), text: "Very late delivery and the fries were soggy.", item: "Fries Combo", order: "12210" },
];

export default function Page() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [filters, setFilters] = useState<ReviewsFilterValue>({ q: "", rating: "all", range: "all", category: "all", sort: "newest" });
  const [replyOpen, setReplyOpen] = useState(false);
  const [active, setActive] = useState<Review | undefined>();
  const [pinned, setPinned] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => Array.from(new Set(reviews.map(r => r.item))), [reviews]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const inRange = (dStr: string) => {
      if (filters.range === "all") return true;
      const d = new Date(dStr).getTime();
      const days = filters.range === "7d" ? 7 : 30;
      return now - d <= days * 86400000;
    };
    let arr = reviews.filter(r => {
      const q = filters.q.toLowerCase();
      const matchQ = [r.customer, r.text, r.order, r.item].join(" ").toLowerCase().includes(q);
      const matchR = filters.rating === "all" || r.rating === filters.rating;
      const matchC = filters.category === "all" || r.item === filters.category;
      const matchT = inRange(r.date);
      return matchQ && matchR && matchC && matchT;
    });
    // sort
    arr = arr.sort((a,b) => {
      if (filters.sort === "newest") return +new Date(b.date) - +new Date(a.date);
      if (filters.sort === "oldest") return +new Date(a.date) - +new Date(b.date);
      if (filters.sort === "high") return b.rating - a.rating;
      if (filters.sort === "low") return a.rating - b.rating;
      return 0;
    });
    // pinned first
    arr = arr.sort((a,b) => Number(!!pinned[b.id]) - Number(!!pinned[a.id]));
    return arr;
  }, [reviews, filters, pinned]);

  const summary: SummaryData = useMemo(() => {
    const total = reviews.length;
    const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    const dist = [5,4,3,2,1].map(stars => ({ stars, pct: total ? Math.round(100 * reviews.filter(r => r.rating === stars).length / total) : 0 }));
    const pos = reviews.filter(r => r.rating >= 4).length;
    const neg = reviews.filter(r => r.rating <= 2).length;
    const snippet = (reviews.find(r => r.rating >= 5)?.text || reviews.find(r => r.rating >= 4)?.text || reviews[0]?.text || "").slice(0, 80);
    return { avg, total, trend: 5, dist, pos, neg, snippet };
  }, [reviews]);

  const onReply = (id: string) => {
    const r = reviews.find(r => r.id === id);
    setActive(r);
    setReplyOpen(true);
  };
  const onHide = (id: string) => setReviews(arr => arr.filter(r => r.id !== id));
  const onPin = (id: string) => setPinned(p => ({ ...p, [id]: !p[id] }));
  const sendReply = (_id: string, _msg: string) => {
    // In a real app, call API then toast
  };

  const clearFilters = () => setFilters({ q: "", rating: "all", range: "all", category: "all", sort: "newest" });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customer Reviews</h1>

      <SummaryInsights data={summary} />

      <ReviewsFilters value={filters} onChange={setFilters} onClear={clearFilters} categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(r => (
          <ReviewCard key={r.id} r={r} onReply={onReply} onHide={onHide} onPin={onPin} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full card p-6 text-center text-slate-500">No reviews match your filters.</div>
        )}
      </div>

      <AnalyticsGrid />

      <ReplyModal open={replyOpen} review={active} onClose={() => setReplyOpen(false)} onSend={sendReply} />
    </div>
  );
}
