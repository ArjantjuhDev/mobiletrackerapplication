// Global require polyfill for browser
if (typeof window !== 'undefined' && typeof window.require === 'undefined') {
	window.require = function() {
		throw new Error('require is not available in the browser');
	};
}

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
