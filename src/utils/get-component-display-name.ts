import { ComponentType } from 'react';

/**
 * Get Display Name of HOC Target Component
 *
 * @param Component
 */
export function getComponentDisplayName(Component: ComponentType<any>, hocName: string) {
  return `${hocName}(${Component.displayName || Component.name || 'Component'})`;
}
