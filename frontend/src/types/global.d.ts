

declare global {
  let JitsiMeetJS: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  interface Window {
    dataLayer: Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export {};
