import { useEffect, useState } from 'react';
import { EVENT_NAMES, WINDOW_FLAGS_KEY } from './constants.js';
import { FeatureFlagError } from './errors.js';
import type { CustomEventWithDetail, FlagUpdateEvent, HostInitEvent } from './types.js';
import { checkStorage } from './utils.js';

export function useFeatureFlags(key: string, defaultValue = false): boolean {
  const [enabled, setEnabled] = useState<boolean>((): boolean => {
    try {
      return (
        window?.[WINDOW_FLAGS_KEY]?.[key] ??
        checkStorage(sessionStorage, key) ??
        checkStorage(localStorage, key) ??
        defaultValue ??
        false
      );
    } catch (err) {
      console.warn(new FeatureFlagError(`Failed to get initial flag value: ${err}`));
      return defaultValue;
    }

    return defaultValue;
  });

  useEffect(() => {
    const handleFlagUpdate = (event: CustomEventWithDetail<FlagUpdateEvent>) => {
      const { key: updatedKey, value } = event.detail;
      if (updatedKey === key) {
        setEnabled(value);
      }
    };

    const handleHostInit = (event: CustomEventWithDetail<HostInitEvent>) => {
      const flags = event.detail;
      if (key in flags) {
        setEnabled(flags[key]);
      }
    };

    window.addEventListener(EVENT_NAMES.FLAG_UPDATE, handleFlagUpdate as EventListener);
    window.addEventListener(EVENT_NAMES.HOST_INIT, handleHostInit as EventListener);

    return () => {
      window.removeEventListener(EVENT_NAMES.FLAG_UPDATE, handleFlagUpdate as EventListener);
      window.removeEventListener(EVENT_NAMES.HOST_INIT, handleHostInit as EventListener);
    };
  }, [key]);

  return enabled;
}
