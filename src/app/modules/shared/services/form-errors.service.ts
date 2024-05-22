import { Injectable } from '@angular/core';
import { Message } from '@shared/models/types/error-message.type';

@Injectable({
	providedIn: 'root',
})
export class FormErrorMessageService {
	public loginErrorMessage: string;

	constructor() {
		this.loginErrorMessage =
			"Votre nom d'utilisateur ou votre mot de passe incorrect";
	}

	getRequiredErrorMessage(fieldName: string): Message {
		return { message: `Le champs ${fieldName} est requis` };
	}

	getMinlengthErrorMessage(fieldName: string, min: number): Message {
		return {
			message: `Le champs ${fieldName} doit comporter ${min}  caractère minimum`,
		};
	}

	getMaxlengthErrorMessage(fieldName: string, max: number): Message {
		return {
			message: `Le champs ${fieldName} doit comporter ${max} max caractère minimum`,
		};
	}

	getEmailErrorMessage(): Message {
		return {
			message: `Votre email n'est pas au bon format`,
		};
	}
}
