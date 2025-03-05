export interface UserServiceInterface<Repository, Args, ReturnType> {
  repository: Repository;
  run(data: Args): Promise<ReturnType>;
}

export class UserService<Repository, Args, ReturnType> {
  repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  async run(data: Args) {}
}
