import { LoaderCircle } from "lucide-react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-green-600" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}