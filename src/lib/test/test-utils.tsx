import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from 'context/authContext';

// import { ThemeProvider } from 'commons/style/styled-components';
// import { theme } from 'commons/style/theme';

export const renderWithAuthProvider = (children: ReactNode) => {
  return render(<AuthProvider >{children}</AuthProvider>);
};
