import { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js"

interface WaveFormProps {
  audioURL: string
}

const WaveForm = ({ audioURL }: WaveFormProps) => {
    const contairnerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (!audioURL || !contairnerRef.current) return
    // Create an instance of WaveSurfer
    const ws = WaveSurfer.create({
      container: contairnerRef.current,
      waveColor: "rgb(229, 229, 229)",
      progressColor: "rgb(178, 178, 178)",
      url: audioURL,
      sampleRate: 44100,
    })

    wsRef.current = ws

    // Initialize the Spectrogram plugin with detailed configuration
    ws.registerPlugin(
      Spectrogram.create({
        // Display frequency labels on the left side
        labels: true,

        // Height of the spectrogram in pixels
        height: 200,

        // Render separate spectrograms for each audio channel
        // Set to false to combine all channels into one spectrogram
        splitChannels: true,

        // Frequency scale type:
        // - 'linear': Standard linear frequency scale (0-20kHz)
        // - 'logarithmic': Logarithmic scale, better for low frequencies
        // - 'mel': Mel scale based on human hearing perception (default)
        // - 'bark': Bark scale for psychoacoustic analysis
        // - 'erb': ERB scale for auditory filter modeling
        scale: "mel",

        // Frequency range to display (in Hz)
        frequencyMax: 8000, // Maximum frequency to show
        frequencyMin: 0, // Minimum frequency to show

        // FFT parameters
        fftSamples: 1024, // Number of samples for FFT (must be power of 2)
        // Higher values = better frequency resolution, slower rendering

        // Visual styling
        labelsBackground: "rgba(0, 0, 0, 0.1)", // Background for frequency labels

        // Performance optimization
        useWebWorker: true, // Use web worker for FFT calculations (improves performance)

        // Additional options you can configure:
        //
        // Window function for FFT (affects frequency resolution vs time resolution):
        // windowFunc: 'hann' | 'hamming' | 'blackman' | 'bartlett' | 'cosine' | 'gauss' | 'lanczoz' | 'rectangular' | 'triangular'
        //
        // Color mapping for frequency intensity:
         colorMap: 'igray'
        //
        // Gain and range for color scaling:
        // gainDB: 20,        // Brightness adjustment (default: 20dB)
        // rangeDB: 80,       // Dynamic range (default: 80dB)
        //
        // Overlap between FFT windows:
        // noverlap: null,    // Auto-calculated by default, or set manually
        //
        // Maximum canvas width for performance:
        // maxCanvasWidth: 30000,  // Split large spectrograms into multiple canvases
      })
    )

    // Play audio when user clicks on the waveform
    ws.once("interaction", () => {
      ws.play()
    })

    // Event listeners for spectrogram interactions
    ws.on("spectrogram-ready" as any, () => {
      console.log("Spectrogram has finished rendering")
    })

    ws.on("spectrogram-click" as any, (relativeX) => {
      console.log("Clicked on spectrogram at position:", relativeX)
      // You can use relativeX to seek to that position in the audio
      ws.setTime(relativeX * ws.getDuration())
    })

    return () => {
        ws.destroy()
    }
  }, [audioURL])

  return (
    <>
      <div ref={contairnerRef} style={{ width: "100%", height: "100%" }}></div>
    </>
  )
}

export default WaveForm
