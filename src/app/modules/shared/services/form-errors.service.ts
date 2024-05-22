import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FormErrorMessageService {
	public loginErrorMessage: string;

	constructor() {
		this.loginErrorMessage =
			"Votre nom d'utilisateur ou votre mot de passe incorrect";
	}
}
