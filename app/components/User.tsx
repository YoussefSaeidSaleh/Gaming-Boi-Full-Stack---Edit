import Image from "next/image";
import React from "react";

const User = ({
  user,
}: {
  user: { name: string; avatar: { secure_url: string } };
}) => {
  return (
    <div className=" cursor-pointer flex items-center gap-3">
      <div className=" w-14 h-14 relative rounded-full overflow-hidden">
        <Image
          className=" object-cover"
          fill
          src={user?.avatar?.secure_url}
          alt={`${user.name}`}
        />
      </div>
      <h1 className=" text-base text-white">{user.name}</h1>
    </div>
  );
};

export default User;

// import Image from "next/image";
// import React from "react";

// const User = ({
//   user,
// }: {
//   user: { name: string; avatar?: { secure_url: string } } | undefined;
// }) => {
//   if (!user) {
//     return <div>Loading...</div>; // أو أي رسالة تنتظر تحميل البيانات
//   }

//   return (
//     <div className="cursor-pointer flex items-center gap-3">
//       <div className="w-14 h-14 relative rounded-full overflow-hidden">
//         <Image
//           className="object-cover"
//           fill
//           src={user.avatar?.secure_url || "/default-avatar.png"}
//           alt={`${user.name}`}
//         />
//       </div>
//       <h1 className="text-base text-white">{user.name}</h1>
//     </div>
//   );
// };

// export default User;
