import Loading from "@/src/components/Loading";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { IsLoggedInAtom } from "../../src/recoil/states";
export default function Landingloading(props) {
  const isLoggedIn = useRecoilValue(IsLoggedInAtom);
  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  return (
    <div className="boomloading">
      <Loading />
    </div>
  );
}
