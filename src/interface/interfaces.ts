import type React from "react";

export type UtilityCardProps = {
  icon: React.ReactNode;
  title: string;
  placeholder: string;
  copyText: string | undefined;
  value: string;
  onChange: (value: string) => void;
  buttonLabel: string;
  ringColor: string;
  bgColor: string;
  buttonColor: string;
  onButtonClick: () => void;
  isLoading: boolean;
  error?: string;
  result: string | null | React.ReactNode;
  hasQueried: boolean;
};
