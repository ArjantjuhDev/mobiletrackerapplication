// Eigen browser-safe useFrameSize hook
export default function useFrameSize() {
  return { width: window.innerWidth || 0, height: window.innerHeight || 0 };
}
