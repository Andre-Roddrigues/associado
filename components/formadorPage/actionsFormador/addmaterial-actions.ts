
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

    try {
      const response = await fetch("https://backend.unitec.ac.mz/addcourse", {
        method: "POST",
        body: formData,
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
