export type TUserSession = {
  _id?: string | null;
  al?: {
    id?: string | null;
    username?: string | null;
    avatar?: string | null;
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
};

export type TSessionPayload = {
  type: string;
  access_token?: string;
  refresh_token?: string;
  authorization_token?: string;
  code_verifier?: string;
};
