import { Button } from "./button";
import { signIn, signOut } from "@/auth";
import { auth } from "@/auth";
import AvatarDropdown from "./avatar-dropdown";

type AuthButtonProps = {
  isUserLoggedIn: boolean;
};

export default async function AuthButton({ isUserLoggedIn }: AuthButtonProps) {
  const session = await auth();

  let userElement;
  if (!isUserLoggedIn) {
    userElement = (
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/shift" });
        }}
      >
        <Button className="hover:bg-gray-600">Sign in</Button>
      </form>
    );
  } else {
    // User is logged in
    const avatarURL = session?.user?.image as string;
    const name = session?.user?.name as string;
    const email = session?.user?.email as string;
    userElement = (
      <AvatarDropdown avatarURL={avatarURL} name={name} email={email} />
    );
  }
  return <div>{userElement}</div>;
}
