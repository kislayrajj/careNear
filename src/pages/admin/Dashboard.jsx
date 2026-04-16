import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analyticsApi } from "../../api/index";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const KPICard = ({ title, value, icon, color, delay, subtext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value ?? "--"}</p>
        {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
      </div>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 rounded" />
        <div className="h-8 w-16 bg-slate-200 rounded" />
      </div>
      <div className="w-14 h-14 bg-slate-200 rounded-xl" />
    </div>
  </div>
);

const GlassCard = ({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg"
  >
    {title && <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>}
    {children}
  </motion.div>
);

const CustomBarChart = ({ data, dataKey, xAxisKey, color, height = 250 }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`h-[${height}px] flex items-center justify-center text-slate-400`}>
        No data available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 11, fill: "#64748b" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748b" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomPieChart = ({ data, nameKey, valueKey, colors, height = 200 }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`h-[${height}px] flex items-center justify-center text-slate-400`}>
        No data available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={70}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const TopList = ({ title, data, type }) => {
  if (!data || data.length === 0) {
    return (
      <GlassCard title={title}>
        <p className="text-slate-400 text-center py-8">No data available</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard title={title}>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, i) => (
          <div
            key={item.id || i}
            className="flex items-center justify-between p-3 bg-white/50 rounded-xl hover:bg-white/80 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0
                    ? "bg-amber-100 text-amber-600"
                    : i === 1
                    ? "bg-slate-100 text-slate-600"
                    : i === 2
                    ? "bg-orange-100 text-orange-600"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.specialization || item.address}
                </p>
              </div>
            </div>
            <div className="text-right">
              {type === "doctor" ? (
                <div className="flex items-center gap-1 text-amber-500">
                  <span>★</span>
                  <span className="font-semibold">
                    {item.rating?.toFixed(1) || "N/A"}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-cyan-600">
                  {item.medicinesCount || 0} meds
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const InsightsPanel = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return null;
  }

  const getIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("highest") || lower.includes("most")) return "📈";
    if (lower.includes("lowest") || lower.includes("least")) return "📉";
    if (lower.includes("dominate") || lower.includes("leading"))
      return "👑";
    if (lower.includes("growth") || lower.includes("increase"))
      return "🚀";
    if (lower.includes("closed") || lower.includes("not available"))
      return "⏰";
    return "💡";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Key Insights</h3>
          <p className="text-sm text-slate-500">AI-powered analysis</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 bg-white/60 rounded-xl hover:bg-white transition cursor-pointer"
          >
            <span className="text-lg mt-0.5">{getIcon(insight)}</span>
            <p className="text-sm text-slate-700 font-medium">{insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [pharmacies, setPharmacies] = useState(null);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewData, doctorsData, pharmaciesData, insightsData] =
          await Promise.all([
            analyticsApi.getOverview(),
            analyticsApi.getDoctors(),
            analyticsApi.getPharmacies(),
            analyticsApi.getInsights().catch(() => null),
          ]);
        setOverview(overviewData);
        setDoctors(doctorsData);
        setPharmacies(pharmaciesData);
        setInsights(insightsData);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const availabilityRate = overview
    ? (
        ((overview.availableDoctors || 0) /
          (overview.totalDoctors || 1)) *
        100
      ).toFixed(1)
    : null;

  const estimatedRevenue = overview?.estimatedRevenue || null;

  const specData =
    doctors?.specializations?.map((s) => ({
      name: s.name.length > 12 ? s.name.substring(0, 12) + "..." : s.name,
      count: s.count,
      avgFee: s.avgFee,
    })) || [];

  const cityDocData =
    doctors?.byCity?.map((c) => ({
      city: c.city.length > 10 ? c.city.substring(0, 10) + "..." : c.city,
      count: c.count,
    })) || [];

  const cityPharmacyData =
    pharmacies?.byCity?.map((c) => ({
      city: c.city.length > 10 ? c.city.substring(0, 10) + "..." : c.city,
      count: c.count,
    })) || [];

  const pieData = pharmacies
    ? [
        { name: "Open", value: pharmacies.openCount || 0 },
        { name: "Closed", value: pharmacies.closedCount || 0 },
      ]
    : [];

  const medData =
    pharmacies?.topMedicines?.map((m) => ({
      name: m.name.length > 12 ? m.name.substring(0, 12) + "..." : m.name,
      count: m.count,
    })) || [];

  const expData =
    doctors?.experienceDistribution?.map((e) => ({
      name: e.range,
      count: e.count,
    })) || [];

  const COLORS = ["#10b981", "#64748b", "#8b5cf6", "#f59e0b", "#ec4899"];
  const PIE_COLORS = ["#10b981", "#64748b"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-purple-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time overview of the CareNear platform
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <KPICard
                title="Total Doctors"
                value={overview?.totalDoctors}
                icon="👨‍⚕️"
                color="bg-gradient-to-br from-cyan-400 to-cyan-600"
                delay={0}
              />
              <KPICard
                title="Total Pharmacies"
                value={overview?.totalPharmacies}
                icon="🏥"
                color="bg-gradient-to-br from-purple-400 to-purple-600"
                delay={0.05}
              />
              <KPICard
                title="Available Doctors"
                value={overview?.availableDoctors}
                icon="✅"
                color="bg-gradient-to-br from-green-400 to-green-600"
                delay={0.1}
              />
              <KPICard
                title="Open Pharmacies"
                value={overview?.openPharmacies}
                icon="🚪"
                color="bg-gradient-to-br from-amber-400 to-amber-600"
                delay={0.15}
              />
              <KPICard
                title="Availability Rate"
                value={availabilityRate ? `${availabilityRate}%` : null}
                icon="📊"
                color="bg-gradient-to-br from-blue-400 to-blue-600"
                delay={0.2}
              />
              <KPICard
                title="Est. Revenue"
                value={
                  estimatedRevenue
                    ? `₹${(estimatedRevenue / 100000).toFixed(1)}L`
                    : null
                }
                icon="💰"
                color="bg-gradient-to-br from-pink-400 to-pink-600"
                delay={0.25}
                subtext="Monthly"
              />
            </>
          )}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlassCard title="Doctors by Specialization" delay={0.3}>
            <CustomBarChart
              data={specData}
              dataKey="count"
              xAxisKey="name"
              color="#06b6d4"
              height={220}
            />
          </GlassCard>

          <GlassCard title="Pharmacies Status" delay={0.35}>
            <CustomPieChart
              data={pieData}
              nameKey="name"
              valueKey="value"
              colors={PIE_COLORS}
              height={220}
            />
          </GlassCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlassCard title="Doctors by City" delay={0.4}>
            <CustomBarChart
              data={cityDocData}
              dataKey="count"
              xAxisKey="city"
              color="#8b5cf6"
              height={220}
            />
          </GlassCard>

          <GlassCard title="Top Medicines" delay={0.45}>
            <CustomBarChart
              data={medData}
              dataKey="count"
              xAxisKey="name"
              color="#f59e0b"
              height={220}
            />
          </GlassCard>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlassCard title="Experience Distribution" delay={0.5}>
            <CustomBarChart
              data={expData}
              dataKey="count"
              xAxisKey="name"
              color="#ec4899"
              height={220}
            />
          </GlassCard>

          <GlassCard title="Pharmacies by City" delay={0.55}>
            <CustomBarChart
              data={cityPharmacyData}
              dataKey="count"
              xAxisKey="city"
              color="#10b981"
              height={220}
            />
          </GlassCard>
        </div>

        {/* Insights Panel */}
        <div className="mb-6">
          <InsightsPanel insights={insights} />
        </div>

        {/* Top Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopList
            title="Top Doctors (by Rating)"
            data={doctors?.topDoctors}
            type="doctor"
          />
          <TopList
            title="Top Pharmacies (by Medicines)"
            data={pharmacies?.topPharmacies}
            type="pharmacy"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;