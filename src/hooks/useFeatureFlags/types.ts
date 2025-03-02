import { EVENT_NAMES, WINDOW_FLAGS_KEY } from './constants.js';

export type CustomEventWithDetail<T> = CustomEvent & {
  detail: T;
};

export type FlagUpdateEvent = {
  key: string;
  value: boolean;
};

export type HostInitEvent = Record<string, boolean>;

declare global {
  interface WindowEventMap {
    [EVENT_NAMES.FLAG_UPDATE]: CustomEventWithDetail<FlagUpdateEvent>;
    [EVENT_NAMES.HOST_INIT]: CustomEventWithDetail<HostInitEvent>;
  }

  interface Window {
    [WINDOW_FLAGS_KEY]?: Record<string, boolean>;
  }
}
