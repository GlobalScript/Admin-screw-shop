import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/userInterfaces';
import { RolesService } from 'src/app/services/roles/rolesService';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  rolesSub!: Subscription;
  removeSub!: Subscription;
  updateRolesSub!: Subscription;
  sub!: Subscription;
  users: User[] = [];
  deleteMessage = false;
  id = '';
  

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
         this.refresh();
    }

    removeUser() {
          this.removeSub = this.rolesService.removeUser(this.id).subscribe({
              next: () => {
              this.sub = this.rolesService.fetchUsers()
              .subscribe({
                  next: (data) => {
                    this.deleteMessage = false;
                    this.users = data;
                    this.sub.unsubscribe();
                   },
                  error: (err) => {
                    console.log(err);
                  }
          });
              this.removeSub.unsubscribe()
          },
          error: (err) => {
              console.log(err);
          }
      });
  }
    updateRole(id: string, roles: string) {
          this.updateRolesSub =  this.rolesService.userRole({id, roles }).subscribe({
              next: () => {
              this.sub = this.rolesService.fetchUsers()
              .subscribe({
                  next: (data) => {
                    this.users = data;
                    this.sub.unsubscribe();
                  },
                  error: (err) => {
                    console.log(err);
                  }
          });
              this.updateRolesSub.unsubscribe()
          },
          error: (err) => {
              console.log(err);
          }
        });
    }
    deleteUser(id: string) {
      this.id = id;
      this.deleteMessage = true;
    }

    refresh() {
        this.rolesSub = this.rolesService.fetchUsers()
        .subscribe({
            next: (data) => {
                this.users = data;
                this.rolesSub.unsubscribe();
              },
            error: (err) => {
                console.log(err);
              }
          });
    }
}
