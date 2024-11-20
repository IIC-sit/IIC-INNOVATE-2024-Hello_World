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
    const org = await req.json();
    const users = await fetchuser(userId);
    
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

async function insertRegisteredDonor(user) {
    try {
      const insertQuery = `
        INSERT INTO registereddonor (user_id, donor_name, donor_phone, org_name)
        VALUES ($1, $2, $3, $4);
      `;
      
      // Insert user_id, donor_name, donor_phone, and org_name
      await poolAuth.query(insertQuery, [user.user_id, user.donor_name, user.donor_phone, user.org_name]);
  
      console.log('Donor registered successfully');
    } catch (error) {
      console.error('Error registering donor:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  }