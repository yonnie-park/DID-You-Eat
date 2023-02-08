import Link from "next/link";
export default function Header() {
  function handleLogout() {
    console.log("logout");
  }
  return (
    <nav className="header">
      <div className="header__logo">
        <Link href="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="header__button">
        <Link href="/landinglogin">
          <button className="header__login">login</button>
        </Link>
        <Link href="/">
          <button className="header__login">logout</button>
        </Link>
      </div>
    </nav>
  );
}
