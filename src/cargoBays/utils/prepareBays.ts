interface PreparedBayItem {
  identifier: string;
  payload: Record<string, unknown>;
}
interface PreparedBay {
  config: Array<PreparedBayItem>;
}
