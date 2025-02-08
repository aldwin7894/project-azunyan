import { TUserSchema } from "@/models/User";
import { createContext } from "react";

export const UserContext = createContext<TUserSchema | null>(null);
