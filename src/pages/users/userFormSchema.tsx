import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(3, { message: "minimum 3 letters required" }),
  email: z.string().email(),
  password: z.string().regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), {
    message: 'password must have minimum 8 character, at least one letter and at least on number'
  }),
});

export type UserInput = z.infer<typeof UserFormSchema>;


// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,