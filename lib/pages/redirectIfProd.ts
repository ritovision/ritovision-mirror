// utils/redirectIfProd.ts
import { redirect } from 'next/navigation';

export function redirectIfProd() {
  if (process.env.NODE_ENV === 'production') {
    redirect('https://ritovision.com');
  }
}
