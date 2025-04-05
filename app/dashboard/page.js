'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

export default function Dashboard() {
//   const user = useSelector((state) => state);
//  console.log(user);
//  alert(user.name)
;
//   Redirect to login if not authenticated
//   if (!user) {
//     redirect('/');
//   }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome</p>
    </div>
  );
}