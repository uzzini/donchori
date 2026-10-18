export const transactionKeys = {
  all: ['transactions'] as const,
  month: (monthKey: string) => [...transactionKeys.all, 'month', monthKey] as const,
};
