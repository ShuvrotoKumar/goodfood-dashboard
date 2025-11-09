import { RevenueChart } from "@/components/revenue-chart";
import { OrderDonut } from "@/components/order-donut";
import { RatingBubbles } from "@/components/rating-bubbles";
import { MostOrdered } from "@/components/most-ordered";
import { OrdersLine } from "@/components/orders-line";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="card p-0">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="sm:col-span-2 p-6">
            <RevenueChart />
          </div>
          <div className="hidden sm:block divider-v" />
          <div className="p-6 flex items-center">
            <OrderDonut />
          </div>
        </div>

        <div className="divider-h" />

        <div className="grid grid-cols-1 xl:grid-cols-3">
          {/* Your Rating */}
          <div className="p-6">
            <RatingBubbles />
          </div>
          {/* Most Ordered */}
          <div className="p-0 xl:border-l xl:border-slate-200">
            <MostOrdered />
          </div>
          {/* Order Summary */}
          <div className="p-6 xl:border-l xl:border-slate-200">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-sm text-slate-500">Order</h3>
                <div className="text-3xl font-semibold">2.568</div>
                <div className="text-xs text-red-500">▼ 2.1% vs last week</div>
                <div className="text-xs text-slate-400">Sales from 1-6 Dec, 2020</div>
              </div>
              <button className="text-indigo-600 bg-indigo-50/70 border border-indigo-100 hover:bg-indigo-50 transition text-sm px-3 py-1 rounded-lg">View Report</button>
            </div>
            <div className="mt-6">
              <OrdersLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
