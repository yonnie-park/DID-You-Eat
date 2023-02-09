import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ClientEmailAtom, IsLoggedInAtom } from "../recoil/states";
import Loading from "./Loading";

export default function GoogleRedirect() {
  const router = useRouter();
  const [clientEmail, setClientEmail] = useRecoilState(ClientEmailAtom);

  const setIsLoggedIn = useSetRecoilState(IsLoggedInAtom);

  useEffect(() => {
    const url = new URL(window.location.href);
    //? hash를 떼어주고
    const hash = url.hash;
    if (hash) {
      //? 토큰만 떼어주면된다.
      const accessToken = hash.split("=")[1].split("&")[0];
      //? 토큰을 이용한 api 요청.
      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken, {
          headers: {
            authorization: `token ${accessToken}`,
            accept: "application/json",
          },
        })
        .then((res) => {
          setClientEmail(res.data.email);
          setIsLoggedIn(true);
          axios
            .post("http://192.168.0.32:3000" + "/users/auth", {
              email: res.data.email,
            })
            .then((res) => console.log(res))
            .then(() => {
              console.log(res.data.email);
              const isBoomLogin = JSON.parse(localStorage.getItem("isBoomLogin"));
              console.log("isBoomLogin", isBoomLogin);

              if (isBoomLogin) {
                router.push("/boomloading");
              } else {
                router.push("/landingloading");
              }
              //여기서  지갑 생성해주고 민팅해주기
            });
        })
        .catch((e) => console.log("oAuth token expired"));
    }
  }, []);

  return (
    <div className="google-redirect">
      <Loading></Loading>
    </div>
  );
}
