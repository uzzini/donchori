export const budgetKeys = {
  all: ['budgets'] as const,
  month: (monthKey: string) => [...budgetKeys.all, 'month', monthKey] as const,
};
