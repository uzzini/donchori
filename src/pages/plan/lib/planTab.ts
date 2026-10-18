export type PlanTab = 'upcoming' | 'recurring';

export const PLAN_TABS: { value: PlanTab; label: string }[] = [
  { value: 'upcoming', label: '예정 지출' },
  { value: 'recurring', label: '반복 거래' },
];

// 탭 ↔ 패널 aria 연결용 id
export const tabId = (tab: PlanTab) => `plan-tab-${tab}`;
export const panelId = (tab: PlanTab) => `plan-panel-${tab}`;
