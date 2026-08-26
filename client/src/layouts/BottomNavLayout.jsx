import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/shared/BottomNavigation"

export default function BottomNavLayout() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden relative">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  )
}