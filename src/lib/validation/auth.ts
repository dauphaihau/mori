// import * as z from "zod"
//
// export const userAuthSchema = z.object({
//   email: z.string().email(),
// })

export interface IUserAuthSchema {
  email: string;
  password: string;
}
