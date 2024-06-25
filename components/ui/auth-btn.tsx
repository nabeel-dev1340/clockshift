import { Button } from "./button";
import { signIn, signOut } from "@/auth";

type AuthButtonProps = {
  isUserLoggedIn: boolean;
};

export default async function AuthButton({ isUserLoggedIn }: AuthButtonProps) {
  return (
    <>
      {!isUserLoggedIn && (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button>Sign in</Button>
        </form>
      )}
      {isUserLoggedIn && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Sign out</Button>
        </form>
      )}
    </>
  );
}
