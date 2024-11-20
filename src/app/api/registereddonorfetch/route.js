import { verifyToken } from '@/utils/jwt';
import { poolAuth } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' },{status:401});
  }
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' },{status:401})
    }
    
    const userId = decodedToken.userId;
    
    const users = await fetchuser();
    
    return NextResponse.json({ users: users },{status:200});

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' },{status:500});
  }
}

async function fetchuser() {
  const result = await poolAuth.query('SELECT * FROM registereduser');

    
    if (result.rows.length > 0) {
      return result.rows; 
    } else {
      console.log('No users found.');
      return [];
    }
}