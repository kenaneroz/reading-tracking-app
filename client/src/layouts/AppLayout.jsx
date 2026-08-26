import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-tan">
      <div className="w-full md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-hidden relative">
        <Outlet />
      </div>  
    </div>
  )
}