import AdminCollection from "@/src/components/AdminCollection";
import AdminLayout from "@/src/components/AdminLayout";
import AdminPageHeader from "@/src/components/AdminPageHeader";
import axios from "axios";
import { AdminAddressAtom } from "@/src/recoil/states";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import Loading from "../../../src/components/Loading";

export default function Store() {
  const adminAddress = useRecoilValue(AdminAddressAtom);
  const router = useRouter();
  const fetcher = async () => {
    const res = await axios.get(`http://192.168.0.32:3000/collections/${adminAddress}`);
    console.log(res.data);
    return res.data;
  };

  const { data, isValidating, error } = useSWR("key", fetcher);

  useEffect(() => {
    if (!adminAddress) router.push("/admin");
  }, [adminAddress]);

  if (isValidating) return <Loading></Loading>;
  if (error) return <div> ERROR!!</div>;
  else
    return (
      <AdminLayout>
        <AdminPageHeader>My Store</AdminPageHeader>
        <h2 className="semi-title">List</h2>
        <div className="admin-store__collection-list">
          {!!data &&
            data.map((e) => {
              return <AdminCollection></AdminCollection>;
            })}
          <Link href="/admin/store/1">
            <AdminCollection></AdminCollection>
          </Link>
          <Link href="/admin/store/create">
            <div className="admin-store__create-collection">
              <span>Create New Store Collection!</span>
            </div>
          </Link>
        </div>
      </AdminLayout>
    );
}
