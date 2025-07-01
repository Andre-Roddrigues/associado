
interface VideoPayload {
  title: string;
  file: File;
  idCourse: number;
  listNumber: number;
}

export async function uploadCourseMaterials(videos: VideoPayload[]): Promise<any[]> {
  const results = [];

  for (const video of videos) {
    const formData = new FormData();
    formData.append('video', video.file);
    formData.append('title', video.title);
    formData.append('idCourse', String(video.idCourse));
    formData.append('listNumber', String(video.listNumber));
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3VuaXRlYy5hYy5teiIsImF1ZCI6IlVuaXRlYyBBY2FkZW15IEludHJ1dG9yIiwic3ViIjoxMCwiaWRJbnN0cnVjdG9yIjoxMiwiZW1haWwiOiJsYXJpb3R5bGVyNkBnbWFpbC5jb20iLCJpYXQiOjE3NTEyODI2MzV9.I9ZmlB4VWwon7DSVn-RK_10nvft3GkWQVChbMGBUZrk"
    try {
      const response = await fetch("http://192.168.1.107:5001/addcourse", {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        });

      if (!response.ok) {
        throw new Error(`Erro ao enviar o vídeo ${video.title}`);
      }

      const data = await response.json();
      results.push(data);
    } catch (error) {
      console.error("Erro no envio de vídeo:", error);
      throw error;
    }
  }

  return results;
}
