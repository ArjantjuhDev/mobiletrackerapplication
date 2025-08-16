import React from 'react';
export const SafeAreaProvider = ({ children }) => <>{children}</>;
export const useSafeAreaInsets = () => ({ top: 0, left: 0, right: 0, bottom: 0 });
export const SafeAreaInsetsContext = React.createContext({ top: 0, left: 0, right: 0, bottom: 0 });
export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });

// Mock initialWindowMetrics export for web compatibility
export const initialWindowMetrics = {
	frame: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
	insets: { top: 0, left: 0, right: 0, bottom: 0 }
};
