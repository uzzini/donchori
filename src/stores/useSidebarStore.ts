import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SidebarState = {
  collapsed: boolean;
  toggle: () => void;
};

/**
 * 데스크톱 사이드바 접힘 상태
 * localStorage('donchori-sidebar')에 저장해 새로고침해도 유지
 */
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: 'donchori-sidebar' },
  ),
);
