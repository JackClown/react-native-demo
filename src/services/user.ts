import { request } from '@/utils/requests';

export function getCurrentUser() {
  return request.get<User>('/user').then(res => res.data);
}
