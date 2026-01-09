'use client'

import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeDisplayProps {
  url: string
}

export function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const downloadQR = (size: number) => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    canvas.width = size
    canvas.height = size

    img.onload = () => {
      if (!ctx) return
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)

      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `qrcode-${size}px.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-white">
      <div className="p-2 bg-white rounded-lg">
        <QRCodeSVG
          ref={svgRef}
          value={url}
          size={160}
          level="M"
          includeMargin={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 font-medium">Download PNG:</p>
        <div className="flex gap-2">
          <button
            onClick={() => downloadQR(128)}
            className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            128px
          </button>
          <button
            onClick={() => downloadQR(256)}
            className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            256px
          </button>
          <button
            onClick={() => downloadQR(512)}
            className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            512px
          </button>
        </div>
      </div>
    </div>
  )
}
