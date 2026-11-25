export async function obtener(URL) {
    try {
        const response = await fetch(URL);

        if (!response.ok) throw new Error('Error en la solicitud');

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Error:', error);
    }
}