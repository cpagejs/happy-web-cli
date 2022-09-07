import request from "@/utils/request";

export function loginApi(data) {
  return request.post('/api/v1/user/login', data, { headers:{ loginChannel:'PC' } });
}

export function captchaApi(data) {
	return request.get("/api/v1/captcha/validGoogleReCaptcha", data);
}

export function gaCodeApi(data) {
	return request.post("/api/v1/user/authorize_advance", data);
}