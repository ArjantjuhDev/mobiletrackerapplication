
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

const darkWebTheme = {
  ...eva.dark,
  colors: {
    ...eva.dark.colors,
    background: '#181818',
    card: '#232323',
    text: '#f5f5f5',
    primary: '#007bff',
    accent: '#00bcd4',
    error: '#d9534f',
  },
};

const lightMobileTheme = {
  ...eva.light,
  colors: {
    ...eva.light.colors,
    background: '#f5f5f5',
    card: '#fff',
    text: '#222',
    primary: '#007bff',
    accent: '#00bcd4',
    error: '#d9534f',
  },
};

const AppTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ApplicationProvider {...eva} theme={isWeb ? darkWebTheme : lightMobileTheme}>
    {children}
  </ApplicationProvider>
);

export default AppTheme;
