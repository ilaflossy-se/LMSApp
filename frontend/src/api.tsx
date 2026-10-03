import { useCallback, useEffect, useState } from "react";

const BASE = process.env.REACT_APP_API_URL ?? "http://127.0.0.1:5000/api";

export interface User { name: string; role: string }
export interface Course { id: number; name: string; progress: number; nextTask: string }
export interface Deadline {
  id: number; title: string; course: string; due: string;
  priority: "high" | "medium" | "low"; done: boolean;
}
export interface ScheduleItem { id: number; day: number; time: string; subject: string; location: string }
export interface Settings { notifications: boolean; emailDigest: boolean }
export interface DashboardData {
  user: User; courses: Course[]; deadlines: Deadline[]; schedule: ScheduleItem[];
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.message ?? `Request failed (${res.status})`);
  return body as T;
}

export function useApi<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api<T>(path)
      .then(d => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [path, tick]);

  const reload = useCallback(() => setTick(t => t + 1), []);
  return { data, setData, error, loading, reload };
}

export function formatDue(iso: string): string {
  const today = new Date().setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(iso + "T00:00:00").getTime() - today) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];