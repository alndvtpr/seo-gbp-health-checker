import React from 'react'

export const RenderBlocks: React.FC<{ blocks: any[] | null | undefined }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        if (block.blockType === 'codeInjection') {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: block.code }}
            />
          )
        }
        return <div key={index}>Unknown Block Type: {block.blockType}</div>
      })}
    </>
  )
}
