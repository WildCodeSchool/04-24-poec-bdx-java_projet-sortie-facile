import { PrimaryRouteEnum } from './route.enum';

export enum FullActivityRouteEnum {
	POST = '/' + PrimaryRouteEnum.ACTIVITY + '/create',
	HOME = '/' + PrimaryRouteEnum.ACTIVITY + '/home',
	DETAILS = '/' + PrimaryRouteEnum.ACTIVITY + '/details',
	UPDATE = '/' + PrimaryRouteEnum.ACTIVITY + '/update',
}

export enum FullAdminRouteEnum {
	HOME = '/' + PrimaryRouteEnum.ADMIN + '/home',
	GRAPH = '/' + PrimaryRouteEnum.ADMIN + '/stats',
	EMAIL = '/' + PrimaryRouteEnum.ADMIN + '/email',
	CALENDAR = '/' + PrimaryRouteEnum.ADMIN + '/calendar',
}

export enum FullAuthenticationRouteEnum {
	LOGIN = '/' + PrimaryRouteEnum.AUTHENTICATION + '/login',
	REGISTER = '/' + PrimaryRouteEnum.AUTHENTICATION + '/register',
}

export enum FullBookingRouteEnum {
	HOME = '/' + PrimaryRouteEnum.BOOKING + '/home',
	DATA = '/' + PrimaryRouteEnum.BOOKING + '/data',
}

export enum FullUserRouteEnum {
	HOME = '/' + PrimaryRouteEnum.USER + '/home',
	PROFILE = '/' + PrimaryRouteEnum.USER + '/profile',
	PASSWORD = '/' + PrimaryRouteEnum.USER + '/password',
	CENTER_OF_INTERESTS = '/' + PrimaryRouteEnum.USER + '/center-of-interest',
	NOTIFICATION = '/' + PrimaryRouteEnum.USER + '/notification',
	ACTIVITY = '/' + PrimaryRouteEnum.USER + '/activity',
	CALENDAR = '/' + PrimaryRouteEnum.USER + '/calendar',
	BOOKING = '/' + PrimaryRouteEnum.USER + '/booking',
}
