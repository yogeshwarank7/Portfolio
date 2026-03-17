import { clsx } from '../utils/clsx.js'
import { useInView } from '../hooks/useInView.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { useMemo } from 'react'

export function Reveal({ as: Comp = 'div', className, children, style, ...rest }) {
  const reduced = usePrefersReducedMotion()
  const inViewOptions = useMemo(() => ({ threshold: 0.18 }), [])
  const { ref, isInView } = useInView(inViewOptions)

  if (reduced) {
    return (
      <Comp className={className} style={style} {...rest}>
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      ref={ref}
      className={clsx('reveal', isInView && 'isInView', className)}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  )
}

