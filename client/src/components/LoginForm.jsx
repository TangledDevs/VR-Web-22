import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

export default function LoginForm() {
  const { isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, userType } = formData;
    if (!email || !password || !userType) {
      toast.error("Fill all the values");
      return;
    }
    const response = await dispatch(login(formData));
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`/${userType}/dashboard`, { replace: true });
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Login.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              type="email"
              label="Email"
              required
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              required
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <div className="flex gap-6">
              <Radio
                name="type"
                label="Admin"
                value="admin"
                required
                onChange={(e) => handleChange("userType", e.target.value)}
              />
              <Radio
                name="type"
                label="Coordinator"
                value="coordinator"
                onChange={(e) => handleChange("userType", e.target.value)}
              />
              <Radio
                name="type"
                label="Student"
                value="student"
                onChange={(e) => handleChange("userType", e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 bg-blue-500"
            fullWidth
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
