import { createBrowserRouter, Outlet } from "react-router";
import Home from "@/app/pages/Home";
import AboutPage from "@/app/pages/AboutPage";
import ContactPage from "@/app/pages/ContactPage";
import { TranslationProvider } from "@/app/contexts/TranslationContext";

// Error Boundary Component
function ErrorBoundary() {
  return (
    <TranslationProvider>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '2rem' }}>Please refresh the page</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#E87428',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </TranslationProvider>
  );
}

// Root layout wrapper
function RootLayout() {
  return (
    <TranslationProvider>
      <Outlet />
    </TranslationProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
    ],
  },
]);