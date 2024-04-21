import { PermissionRequest } from "./addUser.model";

export interface EditUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roleId: string;
    username: string;
    password: string;
    userPermissions: PermissionRequest[];
}