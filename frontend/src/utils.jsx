import { ShieldCheck, AlertTriangle, XCircle, Clock } from "lucide-react";

export const getStatusColor = (status) => {
  const s = status?.toLowerCase() || '';
  if (s.includes("operational")) return "text-emerald-500";
  if (s.includes("degraded")) return "text-yellow-500";
  if (s.includes("partial")) return "text-orange-500";
  if (s.includes("major") || s.includes("outage")) return "text-red-500";
  return "text-gray-500";
};

export const getStatusBgColor = (status) => {
  const s = status?.toLowerCase() || '';
  if (s.includes("operational")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s.includes("degraded")) return "bg-yellow-50 text-yellow-700 border-yellow-200";
  if (s.includes("partial")) return "bg-orange-50 text-orange-700 border-orange-200";
  if (s.includes("major") || s.includes("outage")) return "bg-red-50 text-red-700 border-red-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

export const StatusIcon = ({ status, className = "w-6 h-6" }) => {
  const s = status?.toLowerCase() || '';
  if (s.includes("operational")) return <ShieldCheck className={`${className} text-emerald-500`} />;
  if (s.includes("degraded")) return <Clock className={`${className} text-yellow-500`} />;
  if (s.includes("partial")) return <AlertTriangle className={`${className} text-orange-500`} />;
  if (s.includes("major") || s.includes("outage")) return <XCircle className={`${className} text-red-500`} />;
  return <ShieldCheck className={`${className} text-gray-400`} />;
};
