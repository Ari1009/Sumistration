import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Download, Smartphone, Monitor, Square, AlertCircle, ImageIcon } from 'lucide-react'
import Cropper from 'react-easy-crop'

interface CropModalProps {
  imageUrl: string
  onClose: () => void
}

interface CropSize {
  name: string
  aspect: number | null
  icon: React.ComponentType<any>
  width?: number
  height?: number
}

const CropModal: React.FC<CropModalProps> = ({ imageUrl, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<CropSize>({
    name: 'Phone',
    aspect: 9/16,
    icon: Smartphone,
    width: 1080,
    height: 1920
  })

  const cropSizes: CropSize[] = [
    { name: 'No Crop', aspect: null, icon: ImageIcon },
    { name: 'Phone', aspect: 9 / 16, icon: Smartphone, width: 1080, height: 1920 },
    { name: 'Desktop', aspect: 16 / 9, icon: Monitor, width: 1920, height: 1080 },
    { name: 'Square', aspect: 1, icon: Square, width: 1080, height: 1080 }
  ]

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
    setError(null)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      if (!url.startsWith('/') && !url.includes(window.location.hostname)) {
        image.setAttribute('crossOrigin', 'anonymous')
      }
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    try {
      const image = await createImage(imageSrc)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('No 2d context')
      }

      canvas.width = selectedSize.width!
      canvas.height = selectedSize.height!

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        selectedSize.width!,
        selectedSize.height!
      )

      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (blob) {
            resolve(URL.createObjectURL(blob))
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, 'image/jpeg', 0.95)
      })
    } catch (error) {
      console.error('Error in getCroppedImg:', error)
      throw new Error('Unable to process this image.')
    }
  }

  const handleDownload = async () => {
    try {
      setError(null)
      if (selectedSize.name === 'No Crop') {
        // Force download for No Crop option
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `manga-illustration-original.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
        onClose()
        return
      }
      
      if (!croppedAreaPixels) return
      const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels)

      const link = document.createElement('a')
      link.download = `manga-illustration-${selectedSize.name.toLowerCase()}.jpg`
      link.href = croppedImageUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(croppedImageUrl), 100)
      onClose()
    } catch (error) {
      console.error('Error downloading image:', error)
      setError(error instanceof Error ? error.message : 'Failed to download.')
    }
  }

  return (
    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <motion.div className="manga-panel bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.8, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.8, rotate: 5 }} transition={{ type: 'spring', bounce: 0.4 }}>

        <div className="flex items-center justify-between p-6 border-b-4 border-manga-border flex-shrink-0">
          <h2 className="font-manga font-bold text-2xl text-manga-text">Crop Your Illustration</h2>
          <motion.button onClick={onClose} className="p-2 hover:bg-manga-beige rounded-full transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <X size={24} />
          </motion.button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">

          {error && (
            <motion.div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start space-x-3"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="font-zen font-medium text-red-800 mb-2">Unable to crop</p>
                <p className="font-zen text-sm text-red-600 mb-3">{error}</p>
              </div>
            </motion.div>
          )}

          <div className="mb-6">
            <h3 className="font-zen font-bold text-lg text-manga-text mb-4">Choose Size:</h3>
            <div className="flex flex-wrap gap-3">
              {cropSizes.map(size => {
                const Icon = size.icon
                return (
                  <motion.button key={size.name} onClick={() => setSelectedSize(size)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all ${selectedSize.name === size.name ? 'border-manga-red bg-manga-red text-white' : 'border-manga-border text-manga-text hover:bg-manga-beige'}`}>
                    <Icon size={16} />
                    <span className="font-zen font-medium">{size.name}</span>
                    {size.width && size.height && (
                      <span className="text-sm opacity-75">{size.width}×{size.height}</span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {selectedSize.name !== 'No Crop' && (
            <div className="relative h-80 md:h-96 bg-manga-beige rounded-xl overflow-hidden manga-panel mb-6">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={selectedSize.aspect!}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}

          {selectedSize.name !== 'No Crop' && (
            <div className="space-y-4">
              <div>
                <label className="block font-zen font-medium text-manga-text mb-2">Zoom: {Math.round(zoom * 100)}%</label>
                <input type="range" value={zoom} min={0.5} max={3} step={0.1} onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-manga-beige rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t-2 border-manga-border bg-white flex-shrink-0">
          <motion.button onClick={handleDownload}
            className="w-full manga-panel bg-manga-green text-white py-4 rounded-xl flex items-center justify-center space-x-2 font-zen font-bold text-lg">
            <Download size={24} />
            <span>Download {selectedSize.name} Version</span>
          </motion.button>
        </div>

      </motion.div>
    </motion.div>
  )
}

export default CropModal