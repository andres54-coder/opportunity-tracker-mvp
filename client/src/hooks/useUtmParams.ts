import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useUtmParams() {
  const { search } = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      utm_source: params.get('utm_source') || 'default_source',
      utm_medium: params.get('utm_medium') || 'default_medium',
      utm_campaign: params.get('utm_campaign') || 'default_campaign',
    };
  }, [search]);
}