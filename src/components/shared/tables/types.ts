export interface TableActionHandlers {
  onEdit?: (item: any) => void;
  onDetails?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export interface HeaderOption {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}