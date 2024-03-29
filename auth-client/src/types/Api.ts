export enum RequestHeader {
	AUTHORIZATION = "Authorization",
}

interface IApiSuccessResponse<T> {
	status: "success";
	msg: string;
	data?: T;
}
interface IApiErrorResponse {
	status: "error" | "failure" | "not-ready";
	msg: string;
}

export type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiErrorResponse;

export const enum IApiEndpoint {
	LOGIN = "auth/login",
}

export interface IMethodParams {
	endpoint: IApiEndpoint;
	queryParams?: Object;
	signal?: AbortSignal;
	data?: any;
	checkAuth?: boolean;
}

export const getEndpoint = (endpoint: IApiEndpoint) => `/${endpoint}`;
