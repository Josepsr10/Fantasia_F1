export class Administrador {
    constructor(
        readonly id: string,
        readonly userName: string,
        readonly email: string,
        readonly password: string,
        readonly roles: string[]
    ) {}

    static create(
        id: string,
        userName: string,
        email: string,
        password: string
    ): Administrador {
        return new Administrador(id, userName, email, password, [])
    }

    assignRole(role: string): Administrador {
        return new Administrador(
            this.id,
            this.userName,
            this.email,
            this.password,
            [...this.roles, role]
        )
    }

    removeRole(role: string): Administrador {
        return new Administrador(
            this.id,
            this.userName,
            this.email,
            this.password,
            this.roles.filter(r => r !== role)
        )
    }
}
