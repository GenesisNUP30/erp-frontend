import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { toastItem } from '../components/shared/NotificationsComponent';

type NotificationType = 'success' | 'error';

interface NotificationState {
  isBlocked: boolean;
  postNotification: (
    message: string,
    type?: NotificationType,
    action?: { label: string; callback: () => void },
  ) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  isBlocked: false,

  postNotification: (message, type = 'success', action) => {
    // Evita mostrar múltiples notificaciones al mismo tiempo
    if (get().isBlocked) return;
    set({ isBlocked: true });
    toast.custom((t) => (t.visible ? toastItem(message, type, action) : null), { duration: 3000 });

    // Libera después de 3s (coincide con la duración del toast)
    setTimeout(() => {
      set({ isBlocked: false });
    }, 3000);
  },
}));
