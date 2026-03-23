export default function useDashboardData() {
  const stats = [
    { title: 'Kilos recolectados hoy', value: 1200 },
    { title: 'Rutas asignadas', value: 8 },
  ];

  const activities = [
    {
      id: 1,
      description: 'Juan Pérez inició una nueva recolección',
      date: '22/03/2026',
    },
    {
      id: 2,
      description: 'María López completó una ruta',
      date: '22/03/2026',
    },
  ];

  return {
    stats,
    activities,
  };
}