import { CardHeader, Skeleton, Avatar, IconButton } from "@mui/material";
import React from "react";

type Props = {};

function AvatarSkeleton({}: Props) {
  const loading = true;

  return (
    <CardHeader
      avatar={
        loading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            className="w-20 h-20 md:w-40 md:h-40 border-2 border-pink-600 rounded-full p-1"
          />
        ) : (
          <Avatar
            alt="Ted talk"
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
          />
        )
      }
    />
  );
}

export default AvatarSkeleton;
