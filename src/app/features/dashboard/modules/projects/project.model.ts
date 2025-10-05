export interface Project {
  id: number;
  title: string;
  description: string;
  imageCover: string;      // رابط الصورة الرئيسية
  images: string[];    // مجموعة صور (جولة للمشروع)
  demoLink: string;        // رابط الديمو
}
