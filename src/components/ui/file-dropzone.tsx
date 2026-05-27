'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void
  accept?: Record<string, string[]>
  maxFiles?: number
}

const DEFAULT_ACCEPT: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
}

export default function FileDropzone({
  onFilesChange,
  accept = DEFAULT_ACCEPT,
  maxFiles,
}: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<Map<string, string>>(new Map())

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => {
        const next = maxFiles
          ? [...prev, ...acceptedFiles].slice(0, maxFiles)
          : [...prev, ...acceptedFiles]
        return next
      })
    },
    [maxFiles],
  )

  // Sync external callback whenever internal files change
  useEffect(() => {
    onFilesChange(files)

    // Build object-URL previews for image files
    const nextPreviews = new Map<string, string>()
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        // Reuse existing URL if we already have one for the same file ref
        const key = `${file.name}-${file.size}-${file.lastModified}`
        const existing = previews.get(key)
        if (existing) {
          nextPreviews.set(key, existing)
        } else {
          nextPreviews.set(key, URL.createObjectURL(file))
        }
      }
    })

    // Revoke URLs that are no longer needed
    previews.forEach((url, key) => {
      if (!nextPreviews.has(key)) {
        URL.revokeObjectURL(url)
      }
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviews(nextPreviews)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  // Clean up all object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    noClick: true,
    noKeyboard: true,
  })

  const fileKey = (file: File) =>
    `${file.name}-${file.size}-${file.lastModified}`

  return (
    <div className="w-full space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
          'border-gray-300 bg-white dark:border-zinc-700 dark:bg-zinc-900',
          isDragActive &&
            'border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20',
        )}
      >
        <input {...getInputProps()} />

        <Upload
          className={cn(
            'h-10 w-10 text-gray-400 dark:text-zinc-500',
            isDragActive && 'text-orange-500 dark:text-orange-400',
          )}
          strokeWidth={1.5}
        />

        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Drag files here or
        </p>

        <button
          type="button"
          onClick={open}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium transition-colors',
            'bg-orange-500 text-white hover:bg-orange-600',
            'dark:bg-orange-600 dark:hover:bg-orange-500',
          )}
        >
          Browse Files
        </button>

        {maxFiles && (
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Max {maxFiles} file{maxFiles > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file, index) => {
            const isImage = file.type.startsWith('image/')
            const thumbUrl = previews.get(fileKey(file))

            return (
              <li
                key={`${fileKey(file)}-${index}`}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg border p-3 transition-colors',
                  'border-gray-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800',
                )}
              >
                {/* Thumbnail / icon */}
                {isImage && thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={file.name}
                    className="h-12 w-12 flex-shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-gray-200 dark:bg-zinc-700">
                    <FileText className="h-6 w-6 text-gray-500 dark:text-zinc-400" />
                  </div>
                )}

                {/* File info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-700 dark:text-zinc-200">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={cn(
                    'absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full transition-colors',
                    'bg-gray-300 text-gray-600 hover:bg-red-500 hover:text-white',
                    'dark:bg-zinc-600 dark:text-zinc-300 dark:hover:bg-red-500 dark:hover:text-white',
                    'opacity-0 group-hover:opacity-100 focus:opacity-100',
                  )}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
