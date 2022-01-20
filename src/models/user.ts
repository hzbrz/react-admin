// this was an interface but changed it to a class to work with reducers, accomplishes the same thing still
export class User {
  // ! so we do not have to initialize them in a constructor
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
}