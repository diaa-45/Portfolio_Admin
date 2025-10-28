export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    mainImage: string;
    thumbImage: string;
    date: string; // يمكن استخدام Date عند الحاجة
  }