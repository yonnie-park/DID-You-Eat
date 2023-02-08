import Link from "next/link";

export default function AdminHeader() {
  return (
    <nav className="admin-header">
      <div className="admin-header__container">
        <Link href="/admin">
          <div className="admin-header__home-button">Did You Eat?</div>
        </Link>
        <div className="admin-header__connect-button">Connect Wallet</div>
      </div>
    </nav>
  );
}
