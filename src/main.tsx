import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import PrivateRoute from './routes/PrivateRoute';
import PersonDetails from './pages/PersonDetails/PersonDetails';

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Landing /></PrivateRoute>,
            },
            {
                path:"/login",
                element: <Login />
            },
			{
				path:"/person/:id",
				element:<PrivateRoute><PersonDetails/></PrivateRoute>
			}
        ]
    }
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
