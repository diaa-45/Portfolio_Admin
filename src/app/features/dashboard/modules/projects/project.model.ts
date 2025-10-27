export interface Project {
  id: number;
  title: string;
  description: string;
  imageCover: string;      // رابط الصورة الرئيسية
  images: ProjectImage[];    // مجموعة صور (جولة للمشروع)
  demoLink: string;        // رابط الديمو
}

export interface ProjectImage{
  id: number;
  imageUrl:string;
}
