import { TUserSchema } from "@/models/User";
import { TUserSession } from "@/types/session";
import { IronSession } from "iron-session";
import useSWR from "swr";

const sessionApiRoute = "/api/session";

const fetcher = (
  url: string,
): Promise<{
  session: IronSession<TUserSession> | null;
  user: TUserSchema | object;
}> => fetch(url).then(r => r.json());

export default function useSession() {
  const {
    data: { session, user },
    isLoading,
  } = useSWR(sessionApiRoute, fetcher, {
    fallbackData: {
      session: null,
      user: {},
    },
  });

  return { session, user, isLoading };
}
