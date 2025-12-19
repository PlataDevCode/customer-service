export type HttpRequest = {
  body?: unknown;
  params?: Record<string, string>;
  query?: Record<string, string | undefined>;
  headers?: Record<string, string | undefined>;
};
