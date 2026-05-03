import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import WaveForm from "./WaveForm"

interface DialogProps {
  uploadedAudioURL: string
  audioURL: string
  irURL: string
}

export function DialogScrollableContent({
  uploadedAudioURL,
  audioURL,
  irURL,
}: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver más detalles</Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw]! max-w-5xl!">
        <div className="my-2 grid max-h-[70vh] max-w-full grid-cols-1 gap-2 overflow-y-auto px-4">
          <div className="py-2">
            <DialogTitle>Mi audio</DialogTitle>
            <DialogDescription className="py-2">
              Archivo de auido cargado.
            </DialogDescription>
            <WaveForm audioURL={uploadedAudioURL} />
          </div>
          <div className="py-4">
            <DialogTitle>Audio procesado</DialogTitle>
            <DialogDescription className="py-2">
              Audio procesado con la IR seleccionada.
            </DialogDescription>
            <WaveForm audioURL={audioURL} />
          </div>
          <div className="py-4">
            <DialogTitle>Respuesta impulsional</DialogTitle>
            <DialogDescription className="py-2">
              Respuesta impulsional seleccionada
            </DialogDescription>
            <WaveForm audioURL={irURL} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
