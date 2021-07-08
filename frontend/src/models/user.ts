class User {
  email: string;
  password: string;

  constructor(id: string, email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export default User;
