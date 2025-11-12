const API_URL = import.meta.env.VITE_API_URL

export function handleTicketDownload(fileId: string) {
    const token = localStorage.getItem('access_token')
    fetch(`${API_URL}/file/ticket/${fileId}`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
        if (!res.ok) throw new Error("Archivo no disponible")
        return res.blob()
        })
        .then(blob => {
        // Crea un link temporal para descargar o abrir el archivo
        const url = window.URL.createObjectURL(blob)
        window.open(url, "_blank")
        // Opcional: window.URL.revokeObjectURL(url) después de un tiempo
        })
        .catch(err => {
        alert(err.message)
        })
}