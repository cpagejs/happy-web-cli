import request from "@/utils/request";

export function appPackage() {
  return request.get("/api/user/app_package/query")
}

export function verifyEmailIsRegistered({
  email
}) {
  const data = new FormData()
  data.set("email", email)
  return request.post("/api/user/checkMobileOrEmail", data)
}

export function verifyMobileIsRegistered({
  nationalCode,
  mobile
}) {
  const data = new FormData()
  data.set("national_code", nationalCode)
  data.set("mobile", mobile)
  return request.post("/api/user/checkMobileOrEmail", data)
}