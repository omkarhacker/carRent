import './App.css';
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

export const ProtectedRoute = ({ element }) => {
  if (localStorage.getItem('user')) {
    // user is authenticated
    return element;
  }
  return <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/booking/:carid',
    element: <ProtectedRoute element={<BookingCar />} />,
    loader: ({ params }) => {
      return params.carid;
    },
  },
  {
    path: '/userbookings',
    element: <ProtectedRoute element={<UserBookings />} />,
  },
  {
    path: '/addcar',
    element: <ProtectedRoute element={<AddCar />} />,
  },
  {
    path: '/editcar/:carid',
    element: <ProtectedRoute element={<EditCar />} />,
    loader: ({ params }) => {
      return params.carid;
    },
  },
  {
    path: '/admin',
    element: <ProtectedRoute element={<AdminHome />} />,
  },
]);

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResizeObserverError = (e) => {
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
          e.stopImmediatePropagation();
        }
      };

      window.addEventListener('error', handleResizeObserverError);

      return () => {
        window.removeEventListener('error', handleResizeObserverError); // Cleanup on unmount
      };
    }
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
