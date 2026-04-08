import request from '../../service'
export type loginType = {
  userName: string
  password: string
}
export function loginUser(data: loginType) {
  return request.post({
    url: '/api/auth/login',
    data
  })
}
