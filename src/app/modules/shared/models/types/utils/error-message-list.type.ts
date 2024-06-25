import { Message } from './message.type';

export type ErrorMessageList = {
	required: Message;
	minlength: Message;
	maxlength: Message;
	email: Message;
};
