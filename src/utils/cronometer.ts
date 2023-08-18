type CronometerProps = {
  durationMs: number;
  callback?: CallableFunction;
  onComplete?: CallableFunction;
  onStart?: CallableFunction;
};

export function cronometer({
  durationMs,
  callback,
  onComplete,
  onStart,
}: CronometerProps) {
  const intervalMs = durationMs / 100;
  let totalMs = 0;

  onStart?.();

  const interval = setInterval(() => {
    totalMs += intervalMs;

    if (totalMs >= durationMs) {
      onComplete?.();
      clearInterval(interval);
    }

    callback?.();
  }, intervalMs);
}
