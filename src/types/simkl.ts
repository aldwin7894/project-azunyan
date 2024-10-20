export type TSimklAuthResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type TSimklUserDetailsResponse = {
  user: {
    name: string;
    joined_at: string;
    gender: string;
    avatar: string;
    bio: string;
    loc: string;
    age: string;
  };
  account: {
    id: number;
    timezone: string;
    type: string;
  };
  connections: {
    facebook: boolean;
  };
};
