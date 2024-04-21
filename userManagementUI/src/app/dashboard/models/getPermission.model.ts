export interface getAllPermissionsResponse {
    status: {
        code: string;
        description: string;
    }
    data: getPermission[];
}

export interface getPermission {
    permissionId: string;
    permissionName: string;
    users: getPermissionUser[];
}

export interface getPermissionUser {
    id: string;
    userId: string;
    permissionId: string;
    permissionName: string;
    isReadable: boolean;
    isWritable: boolean;
    isDeletable: boolean
}
