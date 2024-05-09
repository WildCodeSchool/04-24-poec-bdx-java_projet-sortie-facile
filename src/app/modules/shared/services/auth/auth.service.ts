import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  UserAuth,
  UserAuthPrimaryDatas,
  UserListResponseApi,
} from '../../models/types/user-list-response-api.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  loginWithEmailAndPassword(
    username: string,
    password: string
  ): Observable<UserAuthPrimaryDatas> {
    return this._httpClient
      .get<UserListResponseApi>('http://localhost:3000/user')
      .pipe(
        tap((users: UserListResponseApi) => console.log(users)),
        map(
          (users: UserListResponseApi) =>
            users.find((user: UserAuth) => {
              return user.username === username && user.password === password;
            }) as UserAuth
        ),
        map((user: UserAuthPrimaryDatas) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        })),
        tap(() => {
          this._redirectUser();
        })
      );
  }

  createUserWithEmailAndPassword(userCredentials: any): void {
    console.log('created ok');
  }

  private _redirectUser() {
    this._router.navigateByUrl('/user/home');
  }
}
