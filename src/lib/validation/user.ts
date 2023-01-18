import * as Yup from "yup";

export const userNameSchema = Yup.object({
  name: Yup.string().min(3).max(32),
});

