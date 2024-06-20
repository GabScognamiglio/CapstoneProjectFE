//cosa mi ritorna il login

export interface AuthData {
    token: string,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        email: string,
        phoneNumber: string
        role: string,
        account: any,
        tickets: [],
        enabled: boolean,
        authorities: [
            {
                authority: string
            }
        ],
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        accountNonLocked: boolean,
        userName: string
    }
}
