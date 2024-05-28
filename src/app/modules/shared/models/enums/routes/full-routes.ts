import { PrimaryRouteEnum } from './route.enum';

export enum FullActivityRouteEnum {
	POST = '/' + PrimaryRouteEnum.ACTIVITY + '/create',
	HOME = '/' + PrimaryRouteEnum.ACTIVITY + '/home',
	DETAILS = '/' + PrimaryRouteEnum.ACTIVITY + '/details',
	UPDATE = '/' + PrimaryRouteEnum.ACTIVITY + '/update',
}

export enum FullAdminRouteEnum {
	HOME = '/' + PrimaryRouteEnum.ADMIN + '/home',
}

export enum FullAuthenticationRouteEnum {
	LOGIN = '/' + PrimaryRouteEnum.AUTHENTICATION + '/login',
	REGISTER = '/' + PrimaryRouteEnum.AUTHENTICATION + '/register',
}

export enum FullBookingRouteEnum {
	GRAPH = '/' + PrimaryRouteEnum.BOOKING + '/graph',
	HOME = '/' + PrimaryRouteEnum.BOOKING + '/home',
	DATA = '/' + PrimaryRouteEnum.BOOKING + '/data',
	MAIL = '/' + PrimaryRouteEnum.BOOKING + '/mail',
}
// TODO /contacts, /home etc....
// export enum LandingRouteEnum {
// 	DEFAULT = '',
// }

export enum FullUserRouteEnum {
	HOME = '/' + PrimaryRouteEnum.USER + '/home',
	PROFILE = '/' + PrimaryRouteEnum.USER + '/profile',
	PASSWORD = '/' + PrimaryRouteEnum.USER + '/password',
	CENTER_OF_INTERESTS = '/' + PrimaryRouteEnum.USER + '/center-of-interest',
	NOTIFICATION = '/' + PrimaryRouteEnum.USER + '/notification',
	ACTIVITY = '/' + PrimaryRouteEnum.USER + '/activity',
	CALENDAR = '/' + PrimaryRouteEnum.USER + '/calendar',
}
