import { QueryParams } from '../models/config.model';

export function formatQueryUrl(qp: QueryParams): string {
  if (!qp) return '';
  const qpAsStr = mapQueryParamsToUrl(qp);
  return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
}

export function mapQueryParamsToUrl(qp: QueryParams): Array<string> {

  return Object.keys(qp)
    .filter((key) => qp[key] != null)
    .map((key: string) => {
      return `${key}=${qp[key]}`;
    });
}
