export type TUserSession = {
  _id?: string | null;
  al?: {
    act?: string;
    exp?: string;
  };
  mal?: {
    aut?: string;
    cv?: string;
    act?: string;
    rft?: string;
    exp?: string;
  };
};

export type TSessionPayload = {
  type: string;
  access_token?: string;
  refresh_token?: string;
  authorization_token?: string;
  code_verifier?: string;
};
