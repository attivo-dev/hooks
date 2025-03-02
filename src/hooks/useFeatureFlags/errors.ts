export class FeatureFlagError extends Error {
  constructor(message: string) {
    super(`[Attivo Feature Flags] ${message}`);
    this.name = 'FeatureFlagError';
  }
}
