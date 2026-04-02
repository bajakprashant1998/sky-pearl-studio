import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image, Code, Heading1, Heading2, Heading3,
  Quote, Undo, Redo, Type, Palette,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToolbarButton = ({ 
  onClick, icon: Icon, title, active = false 
}: { 
  onClick: () => void; icon: any; title: string; active?: boolean;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    title={title}
    className={`h-8 w-8 p-0 ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
  >
    <Icon className="w-4 h-4" />
  </Button>
);

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  }, [onChange]);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  }, [exec]);

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (url) exec("insertImage", url);
  }, [exec]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-muted/30">
        {/* Text formatting */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-border/50">
          <ToolbarButton onClick={() => exec("bold")} icon={Bold} title="Bold (Ctrl+B)" />
          <ToolbarButton onClick={() => exec("italic")} icon={Italic} title="Italic (Ctrl+I)" />
          <ToolbarButton onClick={() => exec("underline")} icon={Underline} title="Underline (Ctrl+U)" />
          <ToolbarButton onClick={() => exec("strikeThrough")} icon={Strikethrough} title="Strikethrough" />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
          <ToolbarButton onClick={() => exec("formatBlock", "<h1>")} icon={Heading1} title="Heading 1" />
          <ToolbarButton onClick={() => exec("formatBlock", "<h2>")} icon={Heading2} title="Heading 2" />
          <ToolbarButton onClick={() => exec("formatBlock", "<h3>")} icon={Heading3} title="Heading 3" />
          <ToolbarButton onClick={() => exec("formatBlock", "<p>")} icon={Type} title="Paragraph" />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
          <ToolbarButton onClick={() => exec("insertUnorderedList")} icon={List} title="Bullet List" />
          <ToolbarButton onClick={() => exec("insertOrderedList")} icon={ListOrdered} title="Numbered List" />
          <ToolbarButton onClick={() => exec("formatBlock", "<blockquote>")} icon={Quote} title="Blockquote" />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
          <ToolbarButton onClick={() => exec("justifyLeft")} icon={AlignLeft} title="Align Left" />
          <ToolbarButton onClick={() => exec("justifyCenter")} icon={AlignCenter} title="Align Center" />
          <ToolbarButton onClick={() => exec("justifyRight")} icon={AlignRight} title="Align Right" />
        </div>

        {/* Insert */}
        <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
          <ToolbarButton onClick={insertLink} icon={LinkIcon} title="Insert Link" />
          <ToolbarButton onClick={insertImage} icon={Image} title="Insert Image" />
          <ToolbarButton onClick={() => exec("formatBlock", "<pre>")} icon={Code} title="Code Block" />
        </div>

        {/* Color */}
        <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
          <div className="relative">
            <ToolbarButton onClick={() => {}} icon={Palette} title="Text Color" />
            <input
              type="color"
              className="absolute inset-0 opacity-0 cursor-pointer w-8 h-8"
              onChange={(e) => exec("foreColor", e.target.value)}
              title="Text Color"
            />
          </div>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5 pl-2">
          <ToolbarButton onClick={() => exec("undo")} icon={Undo} title="Undo" />
          <ToolbarButton onClick={() => exec("redo")} icon={Redo} title="Redo" />
        </div>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 text-foreground prose prose-sm max-w-none focus:outline-none
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2
          [&_p]:mb-2 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-2
          [&_li]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
          [&_a]:text-primary [&_a]:underline
          [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:font-mono
          [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-3"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
