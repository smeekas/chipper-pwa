import { FormItemProps } from "antd";
type ValidationRule = Record<"title" | "location", FormItemProps["rules"]>;

export const validationRules: ValidationRule = {
  title: [
    {
      required: true,
      message: "Title is Required",
    },
  ],
  location: [
    {
      required: true,
      message: "Location is Required",
    },
  ],
};
