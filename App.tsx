// Polyfill voor require in de browser
if (typeof window !== 'undefined' && typeof window.require === 'undefined') {
  (window as any).require = () => undefined;
}
// Fallback voor require in de browser
declare global {
  interface Window {
    require?: any;
  }
}
if (typeof window.require === 'undefined') {
  window.require = () => undefined;
}
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
