export const xHandleStorageKey = 'ludus.xHandle';
export const xHandleMaxLength = 15;
export const xHandleInputMaxLength = xHandleMaxLength + 1;

const legacyNicknameStorageKey = 'ludus.nickname';
const xHandleListeners = new Set<() => void>();

export function subscribeToXHandle(listener: () => void) {
  xHandleListeners.add(listener);
  return () => xHandleListeners.delete(listener);
}

export function getXHandleSnapshot() {
  if (typeof window === 'undefined') return '';
  try {
    return normalizeXHandle(
      window.localStorage.getItem(xHandleStorageKey) ?? '',
    );
  } catch {
    return '';
  }
}

export function getServerXHandleSnapshot() {
  return '';
}

export function formatXHandleInput(value: string) {
  const withoutLeadingAt = value.trim().replace(/^@+/, '');
  return withoutLeadingAt ? `@${withoutLeadingAt}` : '';
}

export function validateXHandle(value: string) {
  const withoutLeadingAt = value.trim().replace(/^@+/, '');
  if (!withoutLeadingAt) return { normalized: '', error: '' };
  if (withoutLeadingAt.length > xHandleMaxLength) {
    return {
      normalized: formatXHandleInput(value),
      error: `Use ${xHandleMaxLength} characters or fewer.`,
    };
  }
  if (!/^[A-Za-z0-9_]+$/.test(withoutLeadingAt)) {
    return {
      normalized: formatXHandleInput(value),
      error: 'Use only letters, numbers, and underscores.',
    };
  }
  return { normalized: `@${withoutLeadingAt}`, error: '' };
}

export function normalizeXHandle(value: string) {
  const { normalized, error } = validateXHandle(value);
  return error ? '' : normalized;
}

export function saveXHandle(value: string) {
  const { normalized, error } = validateXHandle(value);
  if (error) return '';
  if (typeof window === 'undefined') return normalized;
  try {
    if (normalized) window.localStorage.setItem(xHandleStorageKey, normalized);
    else window.localStorage.removeItem(xHandleStorageKey);
    window.localStorage.removeItem(legacyNicknameStorageKey);
  } catch {
    return normalized;
  }
  xHandleListeners.forEach((listener) => listener());
  return normalized;
}
