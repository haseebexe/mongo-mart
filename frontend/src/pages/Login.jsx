import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/context/UserContext";
// import { useUserData } from "@/hooks/useUserData";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loginUser, btnLoading } = useUserData();

  async function submitHandler() {
    loginUser(email, navigate);
  }

  return (
    <div className="min-h-[60vh]">
      <Card className="sm:w-[300px] md:w-[400px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Enter email to get otp</CardTitle>
          <CardDescription>
            if you already got otp then you can directly go to otp tab
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label className="mb-2.5">Enter Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            onClick={submitHandler}
            disabled={btnLoading}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {btnLoading ? (
              <>
                <LoaderIcon className="animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
