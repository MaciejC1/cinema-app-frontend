import { Outlet } from "react-router-dom"

export default function EmptyLayout() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  )
}
