import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const relativeDate = (timestamp?: number) =>
  timestamp && formatDistanceToNow(timestamp, { addSuffix: true, locale: enUS });
