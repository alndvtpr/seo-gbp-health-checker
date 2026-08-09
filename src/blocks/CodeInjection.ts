import { Block } from 'payload'

export const CodeInjection: Block = {
  slug: 'codeInjection',
  fields: [
    {
      name: 'language',
      type: 'select',
      options: ['html', 'css', 'javascript'],
      defaultValue: 'html',
    },
    {
      name: 'code',
      type: 'code',
      admin: {
        language: 'html',
      },
    },
  ],
}
