export async function POST(request) {
  try {
    const data = await request.json();
    
    // Aquí puedes guardar los datos en memoria, archivo o base de datos temporal
    console.log("JSON recibido del ESP32:", data);

    return Response.json({ status: "ok", received: data });
  } catch (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}
