import Link from "next/link";
export default function Header() {
  return (
    <nav className="header">
      <div className="header__logo">
        <Link href="/" className="header__h1">
          DiD You Eat?
        </Link>
      </div>
      <div className="header__button">
        <Link href="/login">
          <button className="header__login">login</button>
        </Link>
      </div>
    </nav>
  );
}
