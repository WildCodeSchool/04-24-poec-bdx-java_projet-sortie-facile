export enum PrimaryRouteEnum {
	DEFAULT = '',
	ACTIVITY = 'activity',
	ADMIN = 'admin',
	BOOKING = 'booking',
	USER = 'user',
	AUTHENTICATION = 'auth',
	CONTACT = 'contact',
	NOT_FOUND = '**',
	CGU = 'cgu',
}

export enum ActivityRouteEnum {
	HOME = 'home',
	POST = 'create',
	DETAILS = 'details/:id',
	UPDATE = 'update/:id',
}

export enum AdminRouteEnum {
	HOME = 'home',
}

export enum AuthenticationRouteEnum {
	LOGIN = 'login',
	REGISTER = 'register',
}

export enum BookingRouteEnum {
	GRAPH = 'graph',
	HOME = 'home',
	DATA = 'data',
	MAIL = 'mail',
}

export enum LandingRouteEnum {
	DEFAULT = '',
}

export enum UserRouteEnum {
	HOME = 'home',
	PROFILE = 'profile',
	PASSWORD = 'password',
	CENTER_OF_INTERESTS = 'center-of-interest',
	NOTIFICATION = 'notification',
	ACTIVITY = 'activity',
	CALENDAR = 'calendar',
}
