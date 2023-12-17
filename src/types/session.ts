export type UserSession = {
  anilist?: {
    access_token?: string;
    expiration?: string;
    account_details?: {
      id?: number;
      name?: string;
      siteUrl?: string;
      avatar?: {
        medium?: string;
      };
    };
  };
  mal?: {
    authorization_token?: string;
    access_token?: string;
    expiration?: string;
    account_details?: {
      id?: number;
      name?: string;
      siteUrl?: string;
      avatar?: string;
    };
  };
};
