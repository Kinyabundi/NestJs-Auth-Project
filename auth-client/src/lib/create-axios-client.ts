import { RequestHeader } from "@/types/Api";
import axios, { AxiosRequestConfig } from "axios";

interface CreateAxiosClientOptions {
	options?: AxiosRequestConfig;
	getAuthToken: () => Promise<string> | null;
}

export function createAxiosClient({ options = {}, getAuthToken }: CreateAxiosClientOptions) {
	const client = axios.create(options);

	client.interceptors.request.use(
		async (config) => {
			if (config.headers[RequestHeader.AUTHORIZATION] !== false) {
				const token = await getAuthToken();

				if (token) {
					config.headers[RequestHeader.AUTHORIZATION] = `Bearer ${token}`;
				}
			}
			return config;
		},
		(error) => {
			console.error(`Error in axios request interceptor: ${error}`);
			return Promise.reject(error);
		}
	);

	client.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.error(`Error in axios response interceptor: ${error}`);
			return Promise.reject(error);
		}
	);

	return client;
}
