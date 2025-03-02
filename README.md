# @attivo/hooks

A collection of React hooks for [Attivø](https://chromewebstore.google.com/detail/attiv%C3%B8-feature-flag-manag/mekbopeapnlcmdclklappobclffnalof).

## Installation

```bash
npm install @attivo/hooks
```

## Usage

### useFeatureFlags

`useFeatureFlags` is a React hook that integrates with Attivø's feature flag system. It provides real-time feature flag state management in your React components.

```typescript
import { useFeatureFlags } from '@attivo/hooks';

function MyComponent() {
  const isFeatureEnabled = useFeatureFlags('my-feature', false);

  return (
    <div>
      {isFeatureEnabled ? (
        <p>Feature is enabled!</p>
      ) : (
        <p>Feature is disabled</p>
      )}
    </div>
  );
}
```

#### Parameters

- `key` (string): The feature flag identifier
- `defaultValue` (boolean, optional): Default state of the feature flag. Defaults to `false`

#### Returns

- `boolean`: The current state of the feature flag

#### Feature Flag Resolution

The hook resolves feature flags in the following order:
1. Window-level flags
2. Session storage
3. Local storage
4. Default value
5. `false` (fallback)
