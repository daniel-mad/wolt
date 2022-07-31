enum UserType {
  CUSTOMER = 'customer',
  DELIVERY = 'delivery',
}
export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm?: string;
  phone: string;
  user_type: UserType;
};
