import { useRef, useEffect } from 'react';

interface Props {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
  minHeight?: number;
}

export default function CodeEditor({ code, onChange, readOnly = false, minHeight = 260 }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lines = code.split('\n');

  useEffect(() => { sync(); }, [code]);

  const sync = () => {
    if (textareaRef.current && lineRef.current) {
      lineRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const t = e.target as HTMLTextAreaElement;
      const s = t.selectionStart, en = t.selectionEnd;
      const next = code.substring(0, s) + '    ' + code.substring(en);
      onChange(next);
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 4; });
    }
  };

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-700 bg-[#0d1117] font-mono text-[13px] leading-[1.7]">
      {/* Line numbers */}
      <div
        ref={lineRef}
        className="select-none py-3 bg-[#0d1117] border-r border-gray-800 overflow-hidden text-right"
        style={{ minWidth: 44 }}
      >
        {lines.map((_, i) => (
          <div key={i} className="px-2 text-gray-600 text-[12px] leading-[1.7]">{i + 1}</div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={e => onChange(e.target.value)}
        onScroll={sync}
        onKeyDown={handleKey}
        readOnly={readOnly}
        spellCheck={false}
        className={`code-editor flex-1 bg-transparent text-gray-200 p-3 resize-none overflow-auto ${readOnly ? 'cursor-default text-gray-400' : ''}`}
        style={{ minHeight, caretColor: '#F37021' }}
      />
    </div>
  );
}
