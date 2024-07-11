import { ClientJS } from "clientjs";


export const getFingerPrint = () => {
  const client = new ClientJS();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  const canvasHash = canvas.toDataURL();

  // Plugins
  // const plugins = client.().join(',');

  // Timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Hardware concurrency
  const hardwareConcurrency = navigator.hardwareConcurrency;

  // Device memory
  const deviceMemory = navigator.deviceMemory;

  // Combining stable parameters
  const stableFingerprint = client.getCustomFingerprint([
    canvasHash,
    timezone,
    hardwareConcurrency,
    deviceMemory
  ]);

  return stableFingerprint;
};