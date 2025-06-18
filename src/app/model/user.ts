export interface User {
  id: number;
  code: string;
  name: string;
  surname: string;
  telephoneNumber: string;
  email: string;
  address: string;
  balance: number; // BigDecimal -> number lato TS
}