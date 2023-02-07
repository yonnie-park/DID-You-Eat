import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminHeader></AdminHeader>
      <div>{children}</div>
    </div>
  );
}
