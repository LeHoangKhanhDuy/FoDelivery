import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DEMO_CREDENTIALS } from "@/modules/auth/constants";
import type {
  LoginCredentials,
  LoginFieldErrors,
} from "@/modules/auth/types/login-types";
import { createMockAuthSession } from "@/modules/auth/utils/authSession";

const EMPTY_CREDENTIALS: LoginCredentials = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] =
    useState<LoginCredentials>(EMPTY_CREDENTIALS);
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const updateCredential = (field: keyof LoginCredentials, value: string) => {
    setCredentials((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): LoginFieldErrors => {
    const nextErrors: LoginFieldErrors = {};

    if (!credentials.email.trim()) {
      nextErrors.email = "Vui lòng nhập email công việc.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email.trim())) {
      nextErrors.email = "Email công việc không đúng định dạng.";
    }

    if (!credentials.password.trim()) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    createMockAuthSession();
    toast.success("Đăng nhập thành công! Chào mừng Quản trị viên.");
    navigate("/");
  };

  return {
    credentials,
    errors,
    showPassword,
    updateCredential,
    togglePasswordVisibility: () => setShowPassword((current) => !current),
    fillDemoAccount: () => {
      setCredentials({ ...DEMO_CREDENTIALS });
      setErrors({});
    },
    handleSubmit,
  };
};
