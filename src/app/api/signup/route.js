// import { poolAuth } from '@/utils/db';
// import bcrypt from 'bcryptjs';

// export async function POST(req) {
//     try {
//         // const { username, password } = await req.json();
//         const formData = await request.json();
//         const password = formData.
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await poolAuth.query(
//             'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
//             [username, hashedPassword]
//         );

//         return new Response(JSON.stringify({ message: 'User created' }), {
//             status: 201,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         return new Response(JSON.stringify({ message: 'Error creating user', error: error.message }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }

// app/api/camp-signup/route.js

// import { NextResponse } from 'next/server';
// import { poolAuth } from '../../../../utils/db';
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   try {
//     // console.log(req.json())
//     const {formData} = req.body;

//     const { campName, password, address, email, phoneNumber } = formData;

//     // Hash the password before storing it in the database
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const result = await poolAuth.query(
//       `INSERT INTO camps (camp_name, password, address, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [campName, hashedPassword, address, email, phoneNumber]
//     );

//     return NextResponse.json({ success: true, camp: result.rows[0] }, { status: 200 });
//   } catch (error) {
//     console.error('Error inserting camp:', error);
//     return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { poolAuth } from '../../../../utils/db'; // Ensure this is the correct path
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { campName, password, address, email, phoneNumber } = await req.json();;

    // Log the received data for debugging
    // console.log("Received form data:", formData);

    // Hash the password before storing it in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the camp data into the database
    const result = await poolAuth.query(
      `INSERT INTO camps (camp_name, password, address, email, phone_number) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [campName, hashedPassword, address, email, phoneNumber]
    );

    // Log the result to verify the insertion
    console.log("Inserted camp data:", result.rows[0]);

    return NextResponse.json({ success: true, camp: result.rows[0] }, { status: 200 });
  } catch (error) {
    // Log the full error stack for debugging
    console.error('Error inserting camp:', error.stack);

    return NextResponse.json({ success: false, message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

