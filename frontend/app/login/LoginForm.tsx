"use client";

import React, { useState } from "react";
import login from "./actions";
import * as v from 'valibot';
import { LoginSchema } from "./schema";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Login
        </h2>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setEmailError(undefined);
            setPasswordError(undefined);
            setServerError(undefined);

            const result = await login(email, password);
            if (result?.nested) {
              setEmailError(result.nested.email?.join(","));
              setPasswordError(result.nested.password?.join(","));
            } else {
              setServerError("ログインに失敗しました");
            }
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                const result = v.safeParse(LoginSchema.entries.email, email, { abortPipeEarly: true });
                if(result.success) {
                  setEmailError(undefined);
                } else {
                  setEmailError(result.issues.map(i => i.message).join(','));
                }
              }}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
              placeholder="E-mail"
            />
            <div className="h-4">
              <p className="text-red-500 text-sm">{emailError}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                const result = v.safeParse(LoginSchema.entries.password, password, { abortPipeEarly: true });
                if(result.success) {
                  setPasswordError(undefined);
                } else {
                  setPasswordError(result.issues.map(i => i.message).join(','));
                }
              }}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
              placeholder="Password"
            />
            <div className="h-4">
              <p className="text-red-500 text-sm">{passwordError}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
            >
              Login
            </button>
            <p className="text-red-500 text-sm">{serverError}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
