import { request } from '@/utils/requests';

export interface LoginParam {
  bookCode: string;
  userCode: string;
  userPsw: string;
}

export function login(data: LoginParam) {
  return request.post<string>('/login', data).then(res => res.data);
}
