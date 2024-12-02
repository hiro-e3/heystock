'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as v from 'valibot';
import { LoginSchema, TokenSchema } from '../app/login/schema';

export default async function login(email: string, password: string) {
  const loginData = v.safeParse(LoginSchema, { email, password }, {abortPipeEarly: true});

  if(!loginData.success) {
    return v.flatten<typeof LoginSchema>(loginData.issues);
  }

  const response = await fetch(`${process.env.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(loginData.output),
  });

  if(response.ok) {
    const data = v.safeParse(TokenSchema, await response.json());
    
    if(data.success) {
      console.log(data);
      const cookieStore = await cookies();
      cookieStore.set('token', data.output.token, { secure: true, sameSite: 'strict',  httpOnly: true });
      redirect('/');
    }

    return;
  }
}