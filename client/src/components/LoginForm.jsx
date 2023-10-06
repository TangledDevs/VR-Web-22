import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
            <div className="flex gap-6">
              <Radio name="type" label="Admin" />
              <Radio name="type" label="Coordinator" defaultChecked />
              <Radio name="type" label="Student" />
            </div>
          </div>

          <Button className="mt-6 bg-blue-500" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
