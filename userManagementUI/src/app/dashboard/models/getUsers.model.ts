export interface getUsersRequest {
    orderBy: string,
    orderDirection: string,
    PageNumber: number,
    PageSize: number,
    search: string
}


export interface getUsersResponse {
    status: {
        code: string,
        description: string
    }
    data: {
        dataSource: getUsers,
        pageNumber: number,
        pageSize: number,
        total: number
    }
}

export interface getUsers{
    users?: getUser[]
}

export interface getUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: Role,
    username: string,
    password: string,
    createdDate: string,
    permissions: getUserPermission[]
}

export interface Role {
    rolesId: string,
    roleName: string
}

export interface getUserPermission {
    permissionId: string,
    permissionName: string
}
