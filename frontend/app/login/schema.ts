import * as v from 'valibot';

export const TokenSchema = v.object({
  token: v.pipe(v.string(), v.nonEmpty()),
});

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty('E-mailは必須です'), v.email(), v.maxLength(255)),
  password:v.pipe(v.string('パスワードは文字列である必要があります'), v.nonEmpty('パスワードは必須です'), v.minLength(8, 'パスワードは8文字以上必要です')),
});