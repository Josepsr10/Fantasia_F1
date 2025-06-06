export class SuperAdministradoristrador {
    constructor(
        readonly id: string,
        readonly userName: string,
        readonly email: string,
        readonly password: string,
        readonly assignedRoles: string[]
    ) {}

    static create(
        id: string,
        userName: string,
        email: string,
        password: string
    ): SuperAdministradoristrador {
        return new SuperAdministradoristrador(id, userName, email, password, [])
    }

    assignRole(role: string): SuperAdministradoristrador {
        return new SuperAdministradoristrador(
            this.id,
            this.userName,
            this.email,
            this.password,
            [...this.assignedRoles, role]
        )
    }

    removeRole(role: string): SuperAdministradoristrador {
        return new SuperAdministradoristrador(
            this.id,
            this.userName,
            this.email,
            this.password,
            this.assignedRoles.filter(r => r !== role)
        )
    }
}
