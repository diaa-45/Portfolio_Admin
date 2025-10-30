export interface Course {
  id: number;
  title: string;
  imageCover: string;
  instructorName: string;
  description: string;
  contactLink: string;
}

// pagination model
export interface CoursePaginationResult {
  data: Course[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

