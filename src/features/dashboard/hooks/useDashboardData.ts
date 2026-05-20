import { useEffect, useState } from "react";
import apiClient from "../../../api/apiClient";
import { useAuthStore } from "../../auth/store/authStore";

interface DashboardData {
  welcome: string;
  stats?: Record<string, number>;
  actividad_reciente?: any[];
  tareas_hoy?: any[];
  tareas_pendientes?: any[];
}

export default function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/dashboard", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token]);

  // Compatibilidad con los componentes existentes (StatsCards y RecentActivity)
  const stats = data?.stats
    ? Object.entries(data.stats).map(([key, value]) => ({
        key,
        title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value,
      }))
    : [];

  const activities = (data?.actividad_reciente ?? []).map((item, i) => ({
    id: i,
    description: `Recolección: ${item.num_cajas ?? ""} cajas el ${item.fecha ?? ""}`,
    date: item.fecha ?? "",
  }));

  return { stats, activities, welcome: data?.welcome ?? "", loading };
}
