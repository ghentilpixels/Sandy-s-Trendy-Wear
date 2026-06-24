"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  folder?: string;
}

export default function ImageUploader({ onUpload, folder = "eccommerce" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          folder,
          maxFileSize: 2000000,
          sources: ["local", "url", "camera"],
        }}
        onSuccess={(results) => {
          if (results?.info?.secure_url) {
            setPreview(results.info.secure_url as string);
            onUpload(results.info.secure_url as string);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-purple-700"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </button>
        )}
      </CldUploadWidget>
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full rounded-2xl object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 transition-all hover:bg-black/40">
            <ImageIcon className="h-8 w-8 text-white opacity-0 transition-opacity hover:opacity-100" />
          </div>
        </div>
      )}
    </div>
  );
}