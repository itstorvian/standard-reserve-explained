'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Mode } from '@/types/protocol';

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <RadioGroup
      aria-label="Explanation mode"
      value={mode}
      onValueChange={(value) => onChange(value as Mode)}
      className="mode-control"
    >
      {(['simple', 'protocol'] as const).map((value) => (
        <label
          key={value}
          className={`mode-option ${mode === value ? 'selected' : ''}`}
        >
          <RadioGroupItem value={value} />
          <span>{value === 'simple' ? 'Simple Mode' : 'Protocol Mode'}</span>
        </label>
      ))}
    </RadioGroup>
  );
}
