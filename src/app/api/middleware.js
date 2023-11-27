export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard","/add-transaction","/addCategory"] }

callbacks