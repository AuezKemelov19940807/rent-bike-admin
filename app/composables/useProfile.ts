import type { Profile } from "~/utils/types/profile";

export const useProfile = () => {
  const config = useRuntimeConfig();
  const token = useCookie("auth_token");
  const { request, loading } = useApi();

  const {
    data: profile,
    error,
    pending,
  } = useFetch<Profile>("/profile", {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    lazy: true,
  });

  // const {
  //   data: profile,
  //   error,
  //   pending,
  // } = useFetch<Profile>("/profile", {
  //   baseURL: config.public.apiBase,
  //   headers: computed(() => ({
  //     Authorization: token.value ? `Bearer ${token.value}` : "",
  //   })),
  //   lazy: true,
  // });

  const logoFile = ref<File | null>(null);

  const phone = ref("");
  const whats = ref("");
  const telegram = ref("");

  const preview = ref<string | null>(null);
  const fileName = ref<string | null>(null);

  watch(
    profile,
    (val) => {
      if (val) {
        phone.value = val.phone || "";
        whats.value = val.whats || "";
        telegram.value = val.telegram || "";
      }
    },
    { immediate: true },
  );

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] ?? null;

    if (file) {
      preview.value = URL.createObjectURL(file);
      fileName.value = file.name;
      logoFile.value = file;
    }
  };

  const edit = async () => {
    const formData = new FormData();

    formData.append("phone", phone.value);
    formData.append("whats", whats.value);
    formData.append("telegram", telegram.value);

    if (logoFile.value) {
      formData.append("logo", logoFile.value);
    }

    await request<Profile>({
      url: "/profile",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      success: {
        title: "Profile Updated!",
        message: "Saved successfully",
      },
    });
  };

  const isChanged = computed(() => {
    if (!profile.value) return false;

    return (
      phone.value !== (profile.value.phone || "") ||
      whats.value !== (profile.value.whats || "") ||
      telegram.value !== (profile.value.telegram || "") ||
      logoFile.value !== null
    );
  });

  return {
    profile,
    error,
    pending,
    loading,

    phone,
    whats,
    telegram,

    preview,
    fileName,

    handleFileChange,
    edit,
    isChanged,
  };
};
