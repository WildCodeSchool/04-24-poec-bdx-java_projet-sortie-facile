import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginWithEmailAndPassword(email: string, password: string): void {
    console.log('connected ok');
  }

  createUserWithEmailAndPassword(userCredentials: any): void {
    console.log('created ok');
  }
}
