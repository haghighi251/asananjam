export interface Iuser {
  user: {
    user_id: string | undefined;
    username: string | undefined;
  };
  isLoggedIn: boolean;
}
