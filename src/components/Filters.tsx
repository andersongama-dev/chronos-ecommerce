import { useState } from "react";
import { Check } from "lucide-react";

type FilterSectionProps = {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
};

function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
  return (
    <div className="mt-6">
      <h5 className="text-black text-xl font-semibold tracking-[0.02em] mb-3">
        {title}
      </h5>

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer">
            
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md 
                checked:bg-[#4455de] checked:border-[#4455de] 
                transition-all cursor-pointer outline-none 
                focus:ring-2 focus:ring-[#4455de]/30"
              />

              <Check
                className="absolute w-3.5 h-3.5 text-white pointer-events-none 
                opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>

            <span className="text-gray-600 text-lg tracking-[0.02em]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FiltersBar() {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    brand: [],
    gender: [],
    style: [],
    caseMaterial: [],
    strapMaterial: [],
    strapColor: [],
  });

  const toggleFilter = (category: string, value: string) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <aside className="w-[20dvw] top-0 pt-32 pb-16 fixed px-10 h-dvh bg-white overflow-y-auto">
      
      <FilterSection
        title="Brand"
        options={["Rolex", "Casio", "Seiko", "Omega", "Tag Heuer", "Tissot"]}
        selected={filters.brand}
        onChange={(v) => toggleFilter("brand", v)}
      />

      <FilterSection
        title="Gender"
        options={["Men", "Women", "Unisex"]}
        selected={filters.gender}
        onChange={(v) => toggleFilter("gender", v)}
      />

      <FilterSection
        title="Style"
        options={["Casual", "Sport", "Luxury", "Classic", "Diver"]}
        selected={filters.style}
        onChange={(v) => toggleFilter("style", v)}
      />

      <FilterSection
        title="Case Material"
        options={["Stainless Steel", "Gold", "Titanium", "Ceramic"]}
        selected={filters.caseMaterial}
        onChange={(v) => toggleFilter("caseMaterial", v)}
      />

      <FilterSection
        title="Strap Material"
        options={["Leather", "Rubber", "Metal", "Nylon"]}
        selected={filters.strapMaterial}
        onChange={(v) => toggleFilter("strapMaterial", v)}
      />

      <FilterSection
        title="Strap Color"
        options={["Black", "Brown", "Silver", "Gold", "Blue"]}
        selected={filters.strapColor}
        onChange={(v) => toggleFilter("strapColor", v)}
      />

      <div className="mt-6">
        <h5 className="text-black text-xl font-semibold mb-3">Price</h5>

        <input
          type="range"
          min={0}
          max={50000}
          className="w-full accent-[#4455de]"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$0</span>
          <span>$50k</span>
        </div>
      </div>
    </aside>
  );
}