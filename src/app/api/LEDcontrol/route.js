export async function POST(request) {
    try {
      const { ledpin19_status } = await request.json();
  
      if (typeof ledpin19_status === 'number' && (ledpin19_status === 0 || ledpin19_status === 1)) {
        const res = await client.query(
          'UPDATE sensor_data SET ledpin19_status = $1 WHERE sensor_id = 1 RETURNING *',
          [ledpin19_status]
        );
        return new Response(JSON.stringify(res.rows[0]), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'Invalid input data. Expected 0 or 1.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      return handleError(error);
    }
  }
  