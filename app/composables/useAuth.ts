import type { IRegisterResponse, LoginResponse } from "~/utils/types/auth";

export const useAuth = () => {
  // Composables API
  const { request, loading, errorMessage } = useApi();
  //   router
  const router = useRouter();
  // token
  const token = useCookie("auth_token", {
    sameSite: "lax",
    secure: true,
  });

  // Fetch Register
  const register = async (email: string, password: string) => {
    await request<IRegisterResponse>({
      url: "/auth/register",
      method: "POST",
      body: { email, password },
      success: {
        title: "Registration Successful!",
        message: "Account created successfully!",
      },
      redirectTo: "/login",
    });
  };

  // Fetch Login
  const login = async (email: string, password: string) => {
    await request<LoginResponse>({
      url: "/auth/login",
      method: "POST",
      body: { email, password },
      success: {
        title: "Login Successful!",
        message: `Welcome back, ${email}!`,
      },
      onSuccess: (res) => {
        token.value = res.access_token;
      },
      redirectTo: "/profile",
    });
  };

  const logOut = () => {
    token.value = null;
    router.push("/login");
  };

  return {
    register,
    login,
    logOut,
    loading,
    errorMessage,
  };
};
