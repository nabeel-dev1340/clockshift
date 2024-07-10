import { signIn } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "../_logos/google";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="flex flex-col justify-center align-center w-[250px] mx-auto mt-48"
    >
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Please signin to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="submit" variant="outline">
            Signin with google{" "}
            <span className="ml-2">
              <GoogleLogo />
            </span>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
