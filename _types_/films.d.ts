
interface FilmPageProps {
  films: FilmsType
}

interface FilmsType {
  data: FilmData[];
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface FilmData {
  id: number;
  attributes: FilmsAttribute;
}

interface FilmsAttribute {
  title: string;
  release: string;
  director: string;
  plot: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  reviews: Reviews;
}

interface Reviews {
  data: ReviewData[];
}

interface ReviewData {
  id: number;
  attributes: ReviewAttribute;
}

interface ReviewAttribute {
  review: string;
  reviewer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}