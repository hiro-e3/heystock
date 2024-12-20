export type ActionResult<T, E> = {
  success: true,
  data: T
} | {
  success: false,
  errors: E
}