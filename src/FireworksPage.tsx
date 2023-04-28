// needed package: npm install @fireworks-js/react
import { useRef, useState } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import { Button } from '@mui/material';
import "./FireworksPage.css"

export default function FireworksPage() {
  const [isActive, setActive] = useState(false);
  const ref = useRef<FireworksHandlers>(null)

  const toggle = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.pause()
    } else {
      ref.current.start()
    }
  }

  return (
    <>
      <div
        className={isActive ? "menu-active":"menu-normal"}
        style={{ display: 'flex', gap: '4px', position: 'absolute', zIndex: 1 }}
        onMouseEnter={()=>setActive(true)}
        onMouseOut={()=>setActive(false)}
      >
        <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => {window.location.href = "/"}}
        >Home</Button>
        <Button 
            variant="contained" 
            color="primary"
            size="small"
            onClick={() => ref.current!.clear()}
          >Clear</Button>
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
        onClick={() => toggle()}
      />
    </>
  )
}