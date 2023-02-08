import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminHeader></AdminHeader>
      <div className="admin-main">
        <div className="admin-main__container">{children}</div>
      </div>
      <AdminFooter></AdminFooter>
      <style jsx global>
        {`
          body {
            background: black;
          }
        `}
      </style>
    </div>
  );
}
