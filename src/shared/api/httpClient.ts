// src/shared/api/httpClient.ts

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class HttpError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly data: unknown;

  constructor(
    status: number,
    statusText: string,
    data: unknown,
    url: string,
  ) {
    super(`HTTP error ${status} ${statusText}: ${url}`);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  signal?: AbortSignal;
};

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    return response.text();
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function httpClient<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { body, headers, signal, ...restOptions } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    signal,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body === undefined
      ? undefined
      : isFormData
        ? body
        : JSON.stringify(body),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new HttpError(
      response.status,
      response.statusText,
      data,
      response.url,
    );
  }

  return data as TResponse;
}

export const http = {
  get<TResponse>(endpoint: string, options?: RequestOptions) {
    return httpClient<TResponse>(endpoint, {
      ...options,
      method: 'GET',
    });
  },

  post<TResponse>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return httpClient<TResponse>(endpoint, {
      ...options,
      method: 'POST',
      body,
    });
  },

  put<TResponse>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return httpClient<TResponse>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    });
  },

  patch<TResponse>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return httpClient<TResponse>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    });
  },

  delete<TResponse>(endpoint: string, options?: RequestOptions) {
    return httpClient<TResponse>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },
};