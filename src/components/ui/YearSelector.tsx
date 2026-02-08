import { PixelButton } from './PixelButton';
import { GROUND_EFFECT_YEARS } from '@/hooks/useF1Data';
import { cn } from '@/utils/cn';

interface YearSelectorProps {
  selectedYear: string;
  onSelect: (year: string) => void;
}

export function YearSelector({ selectedYear, onSelect }: YearSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-pixel text-pixel-xs text-pixel-text-dim mb-2">
        SELECT YEAR
      </h3>
      <div className="flex flex-wrap gap-2">
        {GROUND_EFFECT_YEARS.map((year) => (
          <PixelButton
            key={year}
            variant={selectedYear === year ? 'primary' : 'secondary'}
            size="md"
            onClick={() => onSelect(year)}
            className={cn(
              'min-w-[80px]',
              selectedYear === year && 'animate-pulse-glow'
            )}
          >
            {year}
          </PixelButton>
        ))}
      </div>
      <div className="mt-2 h-1 w-full bg-pixel-border">
        <div 
          className="h-full bg-f1-red transition-all duration-300"
          style={{ 
            width: `${((GROUND_EFFECT_YEARS.indexOf(selectedYear) + 1) / GROUND_EFFECT_YEARS.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}
