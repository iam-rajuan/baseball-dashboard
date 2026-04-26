import { Extension } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  RemoveFormatting,
  Underline as UnderlineIcon,
} from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const FontSize = Extension.create({
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

type RichTextEditorProps = {
  value: string
  title: string
  description?: string
  databaseStatus?: string
  placeholder?: string
  disabled?: boolean
  onChange: (html: string) => void
}

const fontSizes = [
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '20', value: '20px' },
  { label: '24', value: '24px' },
  { label: '32', value: '32px' },
]

const sanitizePreviewHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'span',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
      'blockquote',
    ],
    ALLOWED_ATTR: ['style'],
  })

const ToolbarButton = ({
  active,
  label,
  onClick,
  children,
  disabled,
}: {
  active?: boolean
  label: string
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}) => (
  <button
    aria-label={label}
    className={cn(
      'inline-flex size-9 items-center justify-center rounded-lg border border-brand-line bg-white text-brand-ink transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-45',
      active && 'border-brand-orange bg-[#fff1e8] text-brand-orange',
    )}
    disabled={disabled}
    onClick={onClick}
    title={label}
    type="button"
  >
    {children}
  </button>
)

export const RichTextEditor = ({
  value,
  title,
  description,
  databaseStatus,
  placeholder = 'Write content here...',
  disabled = false,
  onChange,
}: RichTextEditorProps) => {
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      TextStyle,
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'cms-editor min-h-[360px] rounded-b-2xl border-x border-b border-brand-line bg-white px-5 py-5 text-brand-body outline-none',
      },
    },
    onUpdate: ({ editor: nextEditor }) => onChange(nextEditor.getHTML()),
  })

  useEffect(() => {
    if (!editor || editor.getHTML() === value) {
      return
    }

    editor.commands.setContent(value || '', { emitUpdate: false })
  }, [editor, value])

  useEffect(() => {
    editor?.setEditable(!disabled)
  }, [disabled, editor])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[22px] font-semibold text-brand-ink">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#6c7282]">
            {description}
          </p>
        ) : null}
        {databaseStatus ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8d97ab]">
            {databaseStatus}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-panel">
        <div className="flex flex-wrap items-center gap-2 border border-brand-line bg-[#fbf8f1] px-4 py-3">
          <ToolbarButton
            active={editor?.isActive('bold')}
            disabled={!editor || disabled}
            label="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('italic')}
            disabled={!editor || disabled}
            label="Italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('underline')}
            disabled={!editor || disabled}
            label="Underline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="size-4" />
          </ToolbarButton>

          <div className="mx-1 h-8 w-px bg-brand-line" />

          <select
            aria-label="Font size"
            className="h-9 rounded-lg border border-brand-line bg-white px-3 text-sm font-medium text-brand-ink outline-none disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!editor || disabled}
            onChange={(event) => {
              const nextSize = event.target.value
              if (nextSize) {
                editor?.chain().focus().setFontSize(nextSize).run()
              } else {
                editor?.chain().focus().unsetFontSize().run()
              }
            }}
            value=""
          >
            <option value="">Size</option>
            {fontSizes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <ToolbarButton
            active={editor?.isActive('paragraph')}
            disabled={!editor || disabled}
            label="Paragraph"
            onClick={() => editor?.chain().focus().setParagraph().run()}
          >
            <Pilcrow className="size-4" />
          </ToolbarButton>

          {[1, 2, 3].map((level) => (
            <button
              key={level}
              className={cn(
                'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-brand-line bg-white px-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-45',
                editor?.isActive('heading', { level }) &&
                  'border-brand-orange bg-[#fff1e8] text-brand-orange',
              )}
              disabled={!editor || disabled}
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: level as 1 | 2 | 3 })
                  .run()
              }
              title={`Heading ${level}`}
              type="button"
            >
              H{level}
            </button>
          ))}

          <div className="mx-1 h-8 w-px bg-brand-line" />

          <ToolbarButton
            active={editor?.isActive('bulletList')}
            disabled={!editor || disabled}
            label="Bullet list"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('orderedList')}
            disabled={!editor || disabled}
            label="Numbered list"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="size-4" />
          </ToolbarButton>

          <div className="mx-1 h-8 w-px bg-brand-line" />

          {[
            { label: 'Align left', value: 'left', icon: AlignLeft },
            { label: 'Align center', value: 'center', icon: AlignCenter },
            { label: 'Align right', value: 'right', icon: AlignRight },
            { label: 'Justify', value: 'justify', icon: AlignJustify },
          ].map((item) => {
            const Icon = item.icon

            return (
              <ToolbarButton
                key={item.value}
                active={editor?.isActive({ textAlign: item.value })}
                disabled={!editor || disabled}
                label={item.label}
                onClick={() => editor?.chain().focus().setTextAlign(item.value).run()}
              >
                <Icon className="size-4" />
              </ToolbarButton>
            )
          })}

          <div className="mx-1 h-8 w-px bg-brand-line" />

          <ToolbarButton
            disabled={!editor || disabled}
            label="Clear formatting"
            onClick={() =>
              editor?.chain().focus().unsetAllMarks().clearNodes().unsetTextAlign().run()
            }
          >
            <RemoveFormatting className="size-4" />
          </ToolbarButton>
        </div>

        <EditorContent editor={editor} />
      </div>

      <div className="rounded-2xl border border-brand-line bg-white px-5 py-5">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8d97ab]">
          Preview
        </div>
        <div
          className="cms-editor text-brand-body"
          dangerouslySetInnerHTML={{
            __html: sanitizePreviewHtml(value || '<p>No content yet.</p>'),
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button disabled={disabled} form="cms-content-form" type="submit" variant="navy">
          {disabled ? 'Saving...' : 'Save Content'}
        </Button>
      </div>
    </div>
  )
}
