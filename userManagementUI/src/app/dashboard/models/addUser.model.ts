export interface AddUserRequest {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    RoleId: string;
    Username: string;
    Password: string;
    UserPermissions: PermissionRequest[];
}

export interface PermissionRequest {
    permissionId: string;
    isReadable: Boolean;
    isWritable: Boolean;
    isDeletable: Boolean;
}