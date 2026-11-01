import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AuthProvider from '../features/auth/components/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
