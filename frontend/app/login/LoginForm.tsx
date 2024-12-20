"use client";

import React, { useState } from "react";
import login from "../../actions/login";
import * as v from "valibot";
import { LoginSchema } from "./schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle><Logo /></CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
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
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    const result = v.safeParse(
                      LoginSchema.entries.email,
                      email,
                      {
                        abortPipeEarly: true,
                      }
                    );
                    if (result.success) {
                      setEmailError(undefined);
                    } else {
                      setEmailError(
                        result.issues.map((i) => i.message).join(",")
                      );
                    }
                  }}
                  required
                  placeholder="メールアドレスを入力してください"
                />
                <p className="text-red-500 text-sm">{emailError}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">パスワード</Label>
              <div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    const result = v.safeParse(
                      LoginSchema.entries.password,
                      password,
                      { abortPipeEarly: true }
                    );
                    if (result.success) {
                      setPasswordError(undefined);
                    } else {
                      setPasswordError(
                        result.issues.map((i) => i.message).join(",")
                      );
                    }
                  }}
                  required
                  placeholder="パスワードを入力してください"
                />
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
        <p className="text-red-500 text-xs">{serverError}</p>
          <Button type="submit" form="login-form">
            ログイン
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
