import { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { useStorage, useMutation } from '@liveblocks/react'

// constants
import {
  LEFT_MARGIN_DEFAULT,
  RIGHT_MARGIN_DEFAULT,
  PAGE_WIDTH
} from '@/constants/consts'

const markers = Array.from({ length: 83 }, (_, i) => i)

export const Ruler = () => {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT

  const setLeftMargin = useMutation(({ storage }, newLeftMargin: number) => {
    storage.set('leftMargin', newLeftMargin)
  }, [])

  const setRightMargin = useMutation(({ storage }, newRightMargin: number) => {
    storage.set('rightMargin', newRightMargin)
  }, [])

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const rulerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (isLeft: boolean) => {
    if (isLeft) {
      setIsDraggingLeft(true)
    } else {
      setIsDraggingRight(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const MARGIN_THRESHOLD = 100

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container')

      if (container) {
        const containerRect = container.getBoundingClientRect()
        const mouseX = e.clientX
        const newLeftMargin = mouseX - containerRect.left

        const rawPosition = Math.max(0, Math.min(newLeftMargin, PAGE_WIDTH))
        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MARGIN_THRESHOLD
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition)

          setLeftMargin(newLeftPosition) // TODO: make collaborative
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMargin - MARGIN_THRESHOLD
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
          const constrainedRightPosition = Math.min(
            maxRightPosition,
            newRightPosition
          )

          setRightMargin(constrainedRightPosition) // TODO: make collaborative
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleDoubleClick = (isLeft: boolean) => {
    if (isLeft) {
      setLeftMargin(LEFT_MARGIN_DEFAULT)
    } else {
      setRightMargin(RIGHT_MARGIN_DEFAULT)
    }
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`w-[${PAGE_WIDTH}px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden`}
    >
      <div
        id='ruler-container'
        className='w-full h-full relative'
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={() => handleMouseDown(true)}
          onDoubleClick={() => handleDoubleClick(true)}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={() => handleMouseDown(false)}
          onDoubleClick={() => handleDoubleClick(false)}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className={`relative h-full w-[${PAGE_WIDTH}px]`}>
            {markers.map((marker) => {
              const position = (marker * PAGE_WIDTH) / 82

              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 10 !== 0 && marker % 5 === 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number
  isLeft: boolean
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick
}: MarkerProps) => {
  return (
    <div
      className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2'
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2 ' />
      <div
        className='absolute left-1/2 top-4 transform -translate-x-1/2'
        style={{
          height: '100vh',
          width: '1px',
          backgroundColor: '#3b72f6',
          transform: 'scaleX(0.5)',
          display: isDragging ? 'block' : 'none'
        }}
      />
    </div>
  )
}
