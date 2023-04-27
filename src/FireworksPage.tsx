// needed package: npm install @fireworks-js/react
import { useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import { Button } from '@mui/material';

export default function FireworksPage() {
  const ref = useRef<FireworksHandlers>(null)

  const toggle = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.stop()
    } else {
      ref.current.start()
    }
  }

  return (
    <>
      <div
        style={{ display: 'flex', gap: '4px', position: 'absolute', zIndex: 1 }}
      >
        <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => toggle()}
        >Toggle</Button>
        <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => ref.current!.clear()}
          >Clear</Button>
        <Button 
            variant="contained" 
            color="secondary"
            size="small"
            onClick={() => window.location.href = "/" }
          >Home</Button>
      </div>
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5 }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: '#000'
        }}
      />
    </>
  )
}