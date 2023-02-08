import Header from "@/src/components/Header";
import SBT from "@/src/components/SBT";
export default function Collection() {
  return (
    <div className="collection">
      <Header />
      <div className="landing__main">
        <h1 className="collection__h1">My Collection</h1>
        <div className="collection__row">
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
        </div>
      </div>
    </div>
  );
}
