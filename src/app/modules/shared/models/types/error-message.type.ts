export type ErrorMessages = {
	required: Message;
	minlength: Message;
	maxlength: Message;
	email: Message;
};

export type Message = {
	message: string;
};
