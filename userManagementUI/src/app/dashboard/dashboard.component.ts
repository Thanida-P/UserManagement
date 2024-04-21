import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserRequest, PermissionRequest } from './models/addUser.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Role, getUser, getUserPermission, getUsers, getUsersRequest, getUsersResponse } from './models/getUsers.model';
import { EditUserRequest } from './models/editUser.model';
import { PermissionService } from '../services/permission.service';
import { getAllPermissionsResponse, getPermission, getPermissionUser } from './models/getPermission.model';

@Component({ 
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    logo = "YOURLOGO"
    firstname = "Lekan"
    name = "Lekan Okeowo"
    user_position = "Admin"

    addUserModel: AddUserRequest;
    permissionModel: PermissionRequest;
    getUsersRequestModel: getUsersRequest
    getUsersResponseModel?: getUsersResponse;
    userModel: getUser;
    usersModel: getUsers;
    UserPermissionModel: getUserPermission;
    roleModel: Role;
    editUserModel: EditUserRequest;

    getPermissionUser: getPermissionUser;
    getAllPermissionsModel: getAllPermissionsResponse
    getPermission: getPermission;

    private addUserSubscription?: Subscription;
    private editUserSubscription?: Subscription;

    private userId: string;

    currentPage: number;
    
    @ViewChild('closebutton') closebutton: any;
    @ViewChild('editclosebutton') editclosebutton: any;
    @ViewChild('userForm') userForm!: NgForm;
    @ViewChild('editUserForm') editUserForm!: NgForm;
    
    constructor(private userService: UserService, private permissionService: PermissionService) {
        this.userId = "";
        
        this.getPermissionUser = {
            id: "",
            userId: "",
            permissionId: "",
            permissionName: "",
            isReadable: true,
            isWritable: true,
            isDeletable: true
        }

        this.getPermission = {
            permissionId: "",
            permissionName: "",
            users: [] as getPermissionUser[]
        }

        this.getAllPermissionsModel = {
            status: {
                code: "",
                description: ""
            },
            data: [] as getPermission[]
        }

        this.getUsersRequestModel = {
            orderBy: '',
            orderDirection: '',
            PageNumber: 1,
            PageSize: 6,
            search: ''
        };

        this.addUserModel = {
            Id: '',
            FirstName: '',
            LastName: '',
            Email: '',
            PhoneNumber: '',
            RoleId: '0',
            Username: '',
            Password: '',
            UserPermissions: []
        };

        this.permissionModel = {
            permissionId: '',
            isReadable: false,
            isWritable: false,
            isDeletable: false
        }
        
        this.roleModel = {
            rolesId: '',
            roleName: ''
        }

        this.UserPermissionModel = {
            permissionId: '',
            permissionName: ''
        }

        this.userModel = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            role: this.roleModel,
            username: '',
            password: '',
            createdDate: '',
            permissions: [] as getUserPermission[]
        }

        this.usersModel = {
            users: [] as getUser[]
        };

        this.getUsersResponseModel = {
            status: {
                code: '',
                description: ''
            },
            data: {
                dataSource: this.usersModel,
                pageNumber: 0,
                pageSize: 0,
                total: 0   
            } 
        };

        this.editUserModel = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            roleId: '',
            username: '',
            password: '',
            userPermissions: []
        };

        this.currentPage = this.getUsersRequestModel.PageSize;
    }
    ngOnInit() {
        this.getAllUsers()
    }
    
    getAllUsers() {
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }

    bindCheckboxesToPermissions(method: string): PermissionRequest[] {
        const permissions: PermissionRequest[] = [];
        if (method === "add") {
            var checkboxes = [];
            var superadminRead = document.getElementById('superadmin_Read') as HTMLInputElement;
            var superadminWrite = document.getElementById('superadmin_Write') as HTMLInputElement;
            var superadminDelete = document.getElementById('superadmin_Delete') as HTMLInputElement;
            var adminRead = document.getElementById('admin_Read') as HTMLInputElement;
            var adminWrite = document.getElementById('admin_Write') as HTMLInputElement;
            var adminDelete = document.getElementById('admin_Delete') as HTMLInputElement;
            var employeeRead = document.getElementById('employee_Read') as HTMLInputElement;
            var employeeWrite = document.getElementById('employee_Write') as HTMLInputElement;
            var employeeDelete = document.getElementById('employee_Delete') as HTMLInputElement;
            var hrAdminRead = document.getElementById('hrAdmin_Read') as HTMLInputElement;
            var hrAdminWrite = document.getElementById('hrAdmin_Write') as HTMLInputElement;
            var hrAdminDelete = document.getElementById('hrAdmin_Delete') as HTMLInputElement;
            checkboxes.push(superadminRead, superadminWrite, superadminDelete, adminRead, adminWrite, adminDelete, employeeRead, employeeWrite, employeeDelete, hrAdminRead, hrAdminWrite, hrAdminDelete);
        } else {
            var checkboxes = [];
            var superadminRead = document.getElementById('superadmin_ReadEdit') as HTMLInputElement;
            var superadminWrite = document.getElementById('superadmin_WriteEdit') as HTMLInputElement;
            var superadminDelete = document.getElementById('superadmin_DeleteEdit') as HTMLInputElement;
            var adminRead = document.getElementById('admin_ReadEdit') as HTMLInputElement;
            var adminWrite = document.getElementById('admin_WriteEdit') as HTMLInputElement;
            var adminDelete = document.getElementById('admin_DeleteEdit') as HTMLInputElement;
            var employeeRead = document.getElementById('employee_ReadEdit') as HTMLInputElement;
            var employeeWrite = document.getElementById('employee_WriteEdit') as HTMLInputElement;
            var employeeDelete = document.getElementById('employee_DeleteEdit') as HTMLInputElement;
            var hrAdminRead = document.getElementById('hrAdmin_ReadEdit') as HTMLInputElement;
            var hrAdminWrite = document.getElementById('hrAdmin_WriteEdit') as HTMLInputElement;
            var hrAdminDelete = document.getElementById('hrAdmin_DeleteEdit') as HTMLInputElement;
            checkboxes.push(superadminRead, superadminWrite, superadminDelete, adminRead, adminWrite, adminDelete, employeeRead, employeeWrite, employeeDelete, hrAdminRead, hrAdminWrite, hrAdminDelete);
        }

        var permissionID = "";

        checkboxes?.forEach((checkbox) => {
            const role = checkbox.id.split('_')[0];
            const permissionName = checkbox.id.split('_')[1].toLowerCase();
            
            switch (role) {
                case 'superadmin':
                    permissionID = "1";
                    break;
                case 'admin':
                    permissionID = "2";
                    break;
                case 'employee':
                    permissionID = "3";
                    break;
                case 'hrAdmin':
                    permissionID = "4";
                    break;
            }
            const readable = checkbox.checked;
    
            let permission = permissions.find((p) => p.permissionId === permissionID);
            if (!permission) {
                permission = {
                    permissionId: permissionID,
                    isReadable: false,
                    isWritable: false,
                    isDeletable: false,
                };
                permissions.push(permission);
            }
            if (permissionName === 'read' || permissionName === 'readedit') {
                permission.isReadable = readable;
            } else if (permissionName === 'write' || permissionName === 'writeedit') {
                permission.isWritable = readable;
            } else if (permissionName === 'delete' || permissionName === 'deleteedit') {
                permission.isDeletable = readable;
            }
        });
    
        return permissions;
    }

    togglePasswordVisibility(id: string) {
        const passwordInput = document.getElementById(id) as HTMLInputElement;
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
     }

    close() {
        this.userForm.reset();
        var confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
        confirmPassword.value = '';
        this.closebutton.nativeElement.click();
        this.editclosebutton.nativeElement.click();
        this.addUserSubscription?.unsubscribe();
        this.editUserSubscription?.unsubscribe();

        var roleSelect = document.getElementById('role') as HTMLSelectElement;
        roleSelect.selectedIndex = 0;

        var checkboxes = document.querySelectorAll<HTMLInputElement>('.form-check-input');
        checkboxes.forEach((checkbox) => {
            if (checkbox.id.includes('superadmin') || checkbox.id.includes('hrAdmin') || checkbox.id == 'admin_Read' || checkbox.id == 'employee_Read'){
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    }

    setUserId(id: string) {
        this.userId = id;
    }

    deleteUser() {
        var id = this.userId;
        this.userService.deleteUser(id).subscribe({
            next: (response) => {
                alert('User deleted successfully');
                this.ngOnInit();
            }
        });
        
    }

    editUserDisplay(user: getUser) {
        var id = document.getElementById('editUserID') as HTMLInputElement;
        var firstName = document.getElementById('editFirstName') as HTMLInputElement;
        var lastName = document.getElementById('editLastName') as HTMLInputElement;
        var email = document.getElementById('editEmailID') as HTMLInputElement;
        var phoneNumber = document.getElementById('editMobileNo') as HTMLInputElement;
        var role = document.getElementById('editRole') as HTMLInputElement;
        var username = document.getElementById('editUserName') as HTMLInputElement;
        var password = document.getElementById('editPassword') as HTMLInputElement;
        var confirmPassword = document.getElementById('editConfirmPassword') as HTMLInputElement;

        this.permissionService.getAllPermissions().subscribe({
                    next: (response) => {
                        this.getAllPermissionsModel = response;
                        for (var permission of this.getAllPermissionsModel.data) {
                            for (var userPermission of permission.users) {
                                if (userPermission.userId === user.id) {
                                    switch (userPermission.permissionId) {
                                        case '1':
                                            var readCheckbox = document.getElementById('superadmin_ReadEdit') as HTMLInputElement;
                                            var writeCheckbox = document.getElementById('superadmin_WriteEdit') as HTMLInputElement;
                                            var deleteCheckbox = document.getElementById('superadmin_DeleteEdit') as HTMLInputElement;
                                            readCheckbox.checked = userPermission.isReadable;
                                            readCheckbox.value = userPermission.isReadable.toString();
                                            writeCheckbox.checked = userPermission.isWritable;
                                            writeCheckbox.value = userPermission.isWritable.toString();
                                            deleteCheckbox.checked = userPermission.isDeletable;
                                            deleteCheckbox.value = userPermission.isDeletable.toString();
                                            break;
                                        case '2':
                                            var readCheckbox = document.getElementById('admin_ReadEdit') as HTMLInputElement;
                                            var writeCheckbox = document.getElementById('admin_WriteEdit') as HTMLInputElement;
                                            var deleteCheckbox = document.getElementById('admin_DeleteEdit') as HTMLInputElement;
                                            readCheckbox.checked = userPermission.isReadable;
                                            readCheckbox.value = userPermission.isReadable.toString();
                                            writeCheckbox.checked = userPermission.isWritable;
                                            writeCheckbox.value = userPermission.isWritable.toString();
                                            deleteCheckbox.checked = userPermission.isDeletable;
                                            deleteCheckbox.value = userPermission.isDeletable.toString();
                                            break;
                                        case '3':
                                            var readCheckbox = document.getElementById('employee_ReadEdit') as HTMLInputElement;
                                            var writeCheckbox = document.getElementById('employee_WriteEdit') as HTMLInputElement;
                                            var deleteCheckbox = document.getElementById('employee_DeleteEdit') as HTMLInputElement;
                                            readCheckbox.checked = userPermission.isReadable;
                                            readCheckbox.value = userPermission.isReadable.toString();
                                            writeCheckbox.checked = userPermission.isWritable;
                                            writeCheckbox.value = userPermission.isWritable.toString();
                                            deleteCheckbox.checked = userPermission.isDeletable;
                                            deleteCheckbox.value = userPermission.isDeletable.toString();
                                            break;
                                        case '4':
                                            var readCheckbox = document.getElementById('hrAdmin_ReadEdit') as HTMLInputElement;
                                            var writeCheckbox = document.getElementById('hrAdmin_WriteEdit') as HTMLInputElement;
                                            var deleteCheckbox = document.getElementById('hrAdmin_DeleteEdit') as HTMLInputElement;
                                            readCheckbox.checked = userPermission.isReadable;
                                            readCheckbox.value = userPermission.isReadable.toString();
                                            writeCheckbox.checked = userPermission.isWritable;
                                            writeCheckbox.value = userPermission.isWritable.toString();
                                            deleteCheckbox.checked = userPermission.isDeletable;
                                            deleteCheckbox.value = userPermission.isDeletable.toString();
                                            break;
                                    }
                                }
                            }
                        }
                    }
                });

                id.value = user.id;
                firstName.value = user.firstName;
                lastName.value = user.lastName;
                email.value = user.email;
                phoneNumber.value = user.phoneNumber;
                role.value = user.role.rolesId;
                username.value = user.username;
                password.value = user.password;
                confirmPassword.value = user.password;

                this.editUserModel = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    roleId: user.role.rolesId,
                    username: user.username,
                    password: user.password,
                    userPermissions: []
                };
    }

    onEditSubmit() {
        var password = document.getElementById('editPassword') as HTMLInputElement;
        var confirmPassword = document.getElementById('editConfirmPassword') as HTMLInputElement;
        var email = document.getElementById('editEmailID') as HTMLInputElement;
        var role = document.getElementById('editRole') as HTMLInputElement;
        var id = document.getElementById('editUserID') as HTMLInputElement;

        if (this.editUserForm.invalid) {
            alert('Please fill all required fields');
            return;
        }

        if (!email.value.includes('@')) {
            alert('Invalid email address');
            return;
        }

        if (role.value === '0') {
            alert('Please select a role');
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match');
            return;
        }

        this.editUserModel.userPermissions = this.bindCheckboxesToPermissions("edit");
        console.log(this.editUserModel);
        this.editUserSubscription = this.userService.editUser(this.editUserModel, id.value).subscribe({
            next: (response) => {
                alert('User edited successfully');
                this.close();
                this.getAllUsers();
            }
        });
    }

    onSubmit() {
        var password = document.getElementById('password') as HTMLInputElement;
        var confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
        var email = document.getElementById('emailID') as HTMLInputElement;
        var role = document.getElementById('role') as HTMLInputElement;
        var id = document.getElementById('userID') as HTMLInputElement;

        if (this.userForm.invalid) {
            alert('Please fill all required fields');
            return;
        }
        if (!email.value.includes('@')) {
            alert('Invalid email address');
            return;
        }

        if (role.value === '0') {
            alert('Please select a role');
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match');
            return;
        }

        if (this.getUsersResponseModel?.data?.dataSource?.users) {
            for (var user of this.getUsersResponseModel.data.dataSource.users) {
                if (user.id == id.value) {
                    alert('User ID already exists');
                    return;
                
                }
            }
        }

        this.addUserModel.UserPermissions = this.bindCheckboxesToPermissions("add");
        this.addUserSubscription = this.userService.addUser(this.addUserModel).subscribe({
            next: (response) => {
                alert('User added successfully');
                this.close();
                this.getAllUsers();
            }
        });
    }

    search() {
        var searchbar = document.getElementById('searchbar') as HTMLInputElement;
        this.getUsersRequestModel.search = searchbar.value;
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }

    nextpage() {
        if (this.getUsersResponseModel != null) {
            if (this.getUsersResponseModel.data.total <= this.currentPage) {
                return;
            }
        }
        
        this.getUsersRequestModel.PageNumber += this.getUsersRequestModel.PageSize;
        this.currentPage += this.getUsersRequestModel.PageSize;
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }

    prevPage() {
        if (this.getUsersResponseModel != null) {
            if (this.getUsersRequestModel.PageNumber == 1) {
                return;
            }
        }
        this.getUsersRequestModel.PageNumber -= this.getUsersRequestModel.PageSize;
        this.currentPage -= this.getUsersRequestModel.PageSize;
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }

    updateSize() {
        var sizeElement = document.getElementById('setSize') as HTMLSelectElement;
        var size:number = +sizeElement.value;
        
        this.getUsersRequestModel.PageSize = size;
        this.currentPage = size;
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }

    sort() {
        var sortElement = document.getElementById('sort_by') as HTMLSelectElement;
        var sort = sortElement.value;

        if (sort === 'default') {
            return;
        }
        this.getUsersRequestModel.orderBy = sort;
        this.getUsersRequestModel.orderDirection = 'asc';
        this.userService.getUsers(this.getUsersRequestModel).subscribe({
            next: (response: getUsersResponse) => {
                this.getUsersResponseModel = response;
            }
        });
    }
}