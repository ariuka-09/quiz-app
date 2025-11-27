import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const NavBar = () => {
  return (
    <div className="h-14 flex justify-between w-full items-center  border-b">
      <p className="text-[24px] font-semibold ">Quiz app</p>
      <Avatar>
        <AvatarImage
          className="w-10 h-10 rounded-[50%] "
          src="https://github.com/shadcn.png"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
