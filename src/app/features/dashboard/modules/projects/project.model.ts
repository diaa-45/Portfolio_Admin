// project with pagination
export interface ProjectPaginationResult {
  totalPages: number;          // إجمالي عدد المشاريع
  pageNumber: number;           // رقم الصفحة الحالية
  pageSize: number;       // عدد المشاريع لكل صفحة
  data: Project[];    // قائمة المشاريع في هذه الصفحة
}

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
