import os
import json
import unicodedata

# Función para limpiar y normalizar texto (quitar tildes, minúsculas, etc.)
def normalizar(texto):
    texto = unicodedata.normalize('NFD', texto)
    texto = texto.encode('ascii', 'ignore').decode('utf-8')
    return texto.lower().replace(" ", "").replace("'", "").replace("-", "").replace("_", "")

# Paths
carpeta_canciones = "server\canciones"
archivo_txt = "server\playlist_tracks.txt"
salida_json = "server\canciones.json"

# Obtener lista de archivos de audio disponibles
archivos_audio = os.listdir(carpeta_canciones)
print(carpeta_canciones)
archivos_audio_norm = {
    normalizar(os.path.splitext(f)[0]): f for f in archivos_audio if f.endswith(".mp3")
}

# Lista para guardar los resultados
canciones_json = []

# Leer el archivo de texto
with open(archivo_txt, "r", encoding="utf-8") as f:
    for linea in f:
        linea = linea.strip()
        if not linea or " - " not in linea:
            continue
        
        artista, titulo = linea.split(" - ", 1)
        full_name = f"{artista} - {titulo}"
        
        # Generar clave de búsqueda normalizada
        clave_busqueda = normalizar(f"{artista}_{titulo}")
        
        # Buscar coincidencia en los nombres de archivo
        audio_file = None
        for clave, archivo in archivos_audio_norm.items():
            if clave_busqueda in clave or clave in clave_busqueda:
                audio_file = archivo
                break
        
        if not audio_file:
            print(f"⚠️  No se encontró archivo de audio para: {full_name}")
            continue
        
        ruta_audio = f"D:/reheardle-es/server/canciones/{audio_file}"
        
        canciones_json.append({
            "artist": artista,
            "title": titulo,
            "fullName": full_name,
            "audioPath": ruta_audio
        })

# Guardar resultado en archivo JSON
with open(salida_json, "w", encoding="utf-8") as f_out:
    json.dump(canciones_json, f_out, ensure_ascii=False, indent=2)

print(f"✅ JSON generado con {len(canciones_json)} canciones.")