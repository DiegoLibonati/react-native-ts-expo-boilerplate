import type { Href } from "expo-router";
import type { Company } from "@/types/app";

interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ActionProps extends DefaultProps {
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

export interface LinkProps extends DefaultProps {
  href: Href;
  accessibilityLabel?: string;
  testID?: string;
}

export interface UserCardProps extends DefaultProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
}

export interface CounterProviderProps {
  children: React.ReactNode;
}
