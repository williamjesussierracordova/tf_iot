// Variable global para almacenar los últimos datos recibidos
let latestSensorData = {
  temperature: 0,
  humidity: 0,
  lightLevel: 0,
  irrigation: "off",
  light: "off",
  presencia: "off",
  lastUpdated: new Date().toISOString()
};

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Actualizar los datos almacenados
    latestSensorData = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    console.log("JSON recibido del ESP32:", data);

    return Response.json({ status: "ok", received: data });
  } catch (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    return Response.json({ 
      status: "ok", 
      data: latestSensorData 
    });
  } catch (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}
