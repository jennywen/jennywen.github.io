import { redirect } from 'next/navigation';

export default function SubstackFeedRedirect() {
  redirect('/notes');
  return null;
} 