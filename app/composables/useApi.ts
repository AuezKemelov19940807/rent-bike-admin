export const useApi = () => {
  const config = useRuntimeConfig();
  const router = useRouter();
  const toast = useToast();

  const loading = ref(false);
  const errorMessage = ref("");

  const request = async <T>(options: {
    url: string;
    method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    body?: Record<string, any>;
    headers?: Record<string, string>;
    success?: {
      title: string;
      message: string;
    };
    error?: {
      title: string;
    };
    onSuccess?: (res: T) => void;
    redirectTo?: string;
  }) => {
    loading.value = true;

    try {
      const res = await $fetch<T>(options.url, {
        method: options.method || "POST",
        baseURL: config.public.apiBase,
        body: options.body,
        headers: options.headers,
      });

      if (options.success) {
        toast.success(options.success);
      }

      options.onSuccess?.(res);

      if (options.redirectTo) {
        router.push(options.redirectTo);
      }

      return res;
    } catch (error: any) {
      const status = error?.response?.status;

      // ✅ ЛОВИМ 401
      if (status === 401) {
        const token = useCookie("auth_token");
        token.value = null; // удаляем токен

        toast.error({
          title: "Unauthorized",
          message: "Your session has expired. Please log in again.",
        });

        return navigateTo("/login");
      }

      errorMessage.value = error?.data?.error || "Something went wrong";

      toast.error({
        title: options.error?.title || "Error",
        message: errorMessage.value,
      });

      throw error;
    } finally {
      loading.value = false;
      console.log("API BASE =", config.public.apiBase);
      console.log("REQUEST URL =", options.url);
    }
  };

  return {
    request,
    loading,
    errorMessage,
  };
};
