export function mergeCardData(data, more) {
  const merged = {
    statusCounts: [],
    total: (data?.total || 0) + (more?.total || 0)
  };

  const statusMap = new Map();

  // Merge statusCounts from first source
  data?.statusCounts?.forEach(({ status, count }) => {
    statusMap.set(status, (statusMap.get(status) || 0) + count);
  });

  // Merge statusCounts from second source
  more?.statusCounts?.forEach(({ status, count }) => {
    statusMap.set(status, (statusMap.get(status) || 0) + count);
  });

  // Convert Map to array
  for (const [status, count] of statusMap.entries()) {
    merged.statusCounts.push({ status, count });
  }

  return merged;
}
