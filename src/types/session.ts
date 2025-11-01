export type TUserSession = {
  _id?: string | null;
  al?: {
    id?: string | null;
    username?: string | null;
    avatar?: string | null;
    scoreFormat?:
      | "POINT_100"
      | "POINT_10_DECIMAL"
      | "POINT_10"
      | "POINT_5"
      | "POINT_3"
      | null;
  };
  mal?: {
    aut?: string;
    cv?: string;
    id?: string | null;
    username?: string | null;
    avatar?: string | null;
  };
  simkl?: {
    aut?: string;
    id?: string | null;
    username?: string | null;
    avatar?: string | null;
  };
  trakt?: {
    aut?: string;
    id?: string | null;
    slug?: string | null;
    username?: string | null;
    avatar?: string | null;
  };
};

export type TSessionPayload = {
  type: string;
  access_token?: string;
  refresh_token?: string;
  authorization_token?: string;
  code_verifier?: string;
};
