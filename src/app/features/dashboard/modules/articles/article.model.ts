export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    mainImage: string;
    thumbImage: string;
    date: string; // يمكن استخدام Date عند الحاجة
}
// pagination model
export interface ArticlePaginationResult {
    totalPages: number;        // إجمالي عدد المقالات
    pageNumber: number;         // رقم الصفحة الحالية
    pageSize: number;     // عدد المقالات لكل صفحة
    data: Article[];      // قائمة المقالات في هذه الصفحة
}
