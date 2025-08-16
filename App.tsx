// Polyfill voor require in de browser
if (typeof window !== 'undefined' && typeof window.require === 'undefined') {
// Fallback voor require in de browser

declare global {
  interface Window {
    require?: any;
  }
}
// Aggressive global require polyfill for browser
if (typeof window !== 'undefined') {
  if (typeof window.require === 'undefined') {
    (window as any).require = function() {
      throw new Error('require is not available in the browser');
    declare global {
      interface Window {
        require?: any;
      }
    }
    // Aggressive global require polyfill for browser
    if (typeof window !== 'undefined') {
      if (typeof window.require === 'undefined') {
        (window as any).require = function() {
          throw new Error('require is not available in the browser');
        };
      }
    }
    };
  }
}
}
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
