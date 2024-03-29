import { API_URL, AUTH_SECRET } from "@/env";
import { IApiResponse, IApiEndpoint } from "@/types/Api";
import { LoginFormValues } from "@/types/Forms";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

export const nextAuthOptions: NextAuthConfig = {
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET ?? AUTH_SECRET,
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.user = user;
			}
			return token;
		},

		async session({ session, token }: any) {
			session.user = token.user;

			return session;
		},
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			async authorize(credentials: LoginFormValues) {
				const { email, password } = credentials;

				try {
					const response = await fetch(`${API_URL}/${IApiEndpoint.LOGIN}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					const data = (await response.json()) as IApiResponse;

					if (data?.status === "success") {
						const userInfo = data?.data?.userData;

						const token = data?.data?.accessToken;
						// tokens expire in 2 days, we need to store the expiration date
						const expirationDate = new Date();
						expirationDate.setDate(expirationDate.getDate() + 2);

						const newUser = {
							...userInfo,
							token,
							tokenExpiresAt: expirationDate,
						};

						const { password, ...rest } = newUser;

						return rest;
					} else {
						// @ts-ignore
						console.log(resp?.data?.data?.msg, "error");
						// @ts-ignore
						throw new Error(resp.data?.data?.msg ?? "Invalid credentials");
					}
				} catch (err) {
					console.log("err1", err?.message);
					console.log(err?.response?.data, "error");
					throw new Error(err?.response?.data?.msg ? err?.response?.data?.msg : err?.message ?? "Invalid credentials");
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},
};
