export interface Admin {
    id: string;
    username: any;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface RegisterData {
    username: string;
    password: string;
    confirmPassword: string;
  }