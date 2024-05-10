import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  UserAuth,
  UserAuthPrimaryDatas,
  UserListResponseApi,
} from '../../models/types/user-list-response-api.type';
import { newUser } from '../../models/types/newUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loginWithEmailAndPassword(
    username: string,
    password: string
  ): Observable<UserAuthPrimaryDatas> {
    return this.httpClient
      .get<UserListResponseApi>('http://localhost:3000/user')
      .pipe(
        tap((users: UserListResponseApi) => console.log(users)),
        map(
          (users: UserListResponseApi) =>
            users.find((user: UserAuth) => {
              return user.username === username && user.password === password;
            }) as UserAuth
        ),
        map((user: UserAuth) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }))
      );
  }

  createUserWithEmailAndPassword(userCredentials: newUser): void {
    console.log('created ok');
    this.httpClient.post('http://localhost:3000/user', userCredentials).subscribe();
  }
}
