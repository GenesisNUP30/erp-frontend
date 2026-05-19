import type { StatusOption } from "../../../components/shared/StatusChip";

export const pagoStatusOptions: StatusOption[] = [
  { label: "Borrador", value: "borrador", color: "default" },
  { label: "Validado", value: "validado", color: "info" },
  { label: "Pagado", value: "pagado", color: "success" },
  { label: "Archivado", value: "archivado", color: "warning" },
];
