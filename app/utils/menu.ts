import bikeIcon from "@/assets/img/bike.svg";
import bikeIconWhite from "@/assets/img/bike-white.svg";
import profileIcon from "@/assets/img/profile.svg";
import profileIconWhite from "@/assets/img/profile-white.svg";
import loginIcon from "@/assets/img/login.svg";

export interface MenuItem {
  id: number;
  name: string;
  icon: string;
  iconWhite: string;
  link: string;
}

export const menu: MenuItem[] = [
  {
    id: 1,
    name: "Мои мотоциклы",
    icon: bikeIcon,
    iconWhite: bikeIconWhite,
    link: "/bikes",
  },

  {
    id: 1,
    name: "Профиль",
    icon: profileIcon,
    iconWhite: profileIconWhite,
    link: "/profile",
  },
];
