import { useEffect, useRef } from 'react'

export default function CursorDot() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch devices

    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select')
      ring.classList.toggle('cursor-ring--active', !!interactive)
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(animateRing)
    document.body.classList.add('cursor-hidden')

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-hidden')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}