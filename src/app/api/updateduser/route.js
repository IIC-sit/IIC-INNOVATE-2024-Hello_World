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
    const {userId, amount} = await req.json();
    const orgId = decodedToken.userId;
    

    const user = await fetchuser(userId);
    const org = await fetchorg(orgId);
    insertUpdatedUser(user,org,amount)
    return NextResponse.json({ message: "Success" },{status:200});

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' },{status:500});
  }
}

async function fetchuser(userId) {
    try {
        const result = await poolAuth.query('SELECT * FROM donor WHERE id=$1', [userId]);
    
        if (result.rows.length > 0) {
          return result.rows[0]; // Returns the first user found
        } else {
          console.log('No users found.');
          return null; // Returning null when no user is found is a clearer response than an empty array
        }
      } catch (error) {
        console.error('Error fetching user:', error); // Log the error if the query fails
        throw error; // Optionally, rethrow the error to be handled by the calling code
      }
}

async function fetchorg(orgId) {
    try {
        const result = await poolAuth.query('SELECT * FROM organisation WHERE id=$1', [orgId]);
    
        if (result.rows.length > 0) {
          return result.rows[0];
        } else {
          console.log('No users found.');
          return null; // Returning null when no user is found is a clearer response than an empty array
        }
      } catch (error) {
        console.error('Error fetching user:', error); // Log the error if the query fails
        throw error; // Optionally, rethrow the error to be handled by the calling code
      }
  }

  async function insertUpdatedUser(user, org,amount) {
    try {
      const insertQuery = `
        INSERT INTO updateduser (userid,donor_name, org_name, amount)
        VALUES ($1, $2, $3, $4);
      `;
      
      // Insert donor_name, org_name, amount, and serial
      await poolAuth.query(insertQuery, [user.id,user.name, org.name,amount]);
  
      console.log('Data inserted successfully into updateduser table');
    } catch (error) {
      console.error('Error inserting data into updateduser table:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  }
  