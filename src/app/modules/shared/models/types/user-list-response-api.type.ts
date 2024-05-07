export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserAuth = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: RoleEnum;
};

export type UserListResponseApi = UserAuth[];

export type UserAuthPrimaryDatas = Pick<
  UserAuth,
  'id' | 'username' | 'email' | 'role'
>;
