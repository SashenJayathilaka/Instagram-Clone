import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Intro from "./Intro";
import ProfileFeed from "./ProfileFeed";
import ProfileHeader from "./ProfileHeader";
import Tag from "./Tag";

type Props = {};

export default function MainProfile({}: Props) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [isShow, setIsShow] = useState(false);

  const filterUserData = () => {
    try {
      userDetails.map((data) => {
        if (data.data().userId === userId) {
          setUserData(data.data());

          if (data.data().username === session?.user?.name) {
            setIsShow(true);
          }
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    filterUserData();
  }, [userDetails]);

  return (
    <main className="bg-gray-100 bg-opacity-25">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <ProfileHeader isShow={isShow} userData={userData} />
        <Tag />
        <div className="px-px md:px-3">
          <Intro />
          <ProfileFeed userId={userId} setUserData={setUserDetails} />
        </div>
      </div>
    </main>
  );
}
