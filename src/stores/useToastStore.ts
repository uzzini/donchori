import { create } from 'zustand';

export type ToastTone = 'success' | 'error';

type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastState = {
  toast: ToastItem | null;
  open: boolean; // false가 되면 퇴장 트랜지션 후 toast를 비움
  show: (message: string, tone?: ToastTone) => void;
  hide: () => void;
  clear: () => void;
};

let nextId = 0;

/**
 * 전역 토스트 상태
 * 한 번에 하나만 보여 주고, 새로 띄우면 이전 토스트를 교체
 */
export const useToastStore = create<ToastState>()((set) => ({
  toast: null,
  open: false,
  show: (message, tone = 'success') => set({ toast: { id: ++nextId, message, tone }, open: true }),
  hide: () => set({ open: false }),
  clear: () => set({ toast: null, open: false }),
}));
