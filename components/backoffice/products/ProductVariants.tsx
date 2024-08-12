"use client";

import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type PropType = {
  showVariantInput: boolean;
  setShowVariantInput: Dispatch<SetStateAction<boolean>>;
  variant: string;
  setVariant: Dispatch<SetStateAction<string>>;
  variants: String[];
  setVariants: Dispatch<SetStateAction<String[]>>;
};

export default function ProductVariants({
  showVariantInput,
  setShowVariantInput,
  variant,
  setVariant,
  variants,
  setVariants,
}: PropType) {
  const addVariant = () => {
    if (!variant) return;
    setVariants((prev) => [variant, ...prev]);
    setVariant("");
  };

  return (
    <section className="w-full mt-6">
      <h1 className="text-xl font-semibold mb-4">Variants</h1>
      <div className="border border-slate-300 p-4 rounded-md">
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium">Product Variant</p>
          <button
            onClick={() => setShowVariantInput((prev) => !prev)}
            type="button"
            className="text-primary text-sm flex gap-1 items-center font-semibold"
          >
            <Plus className="w-4 h-4" /> <span>Add variants</span>
          </button>
        </div>
        {showVariantInput && (
          <div className=" bg-white flex items-center gap-2">
            <input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="e.g: 46, 47 for shoes or White XL for clothes..."
              className="w-full focus:outline-none h-9 hover:border-primary/40 hover:shadow-md border border-slate-300 rounded px-2"
            />
            <button
              disabled={!variant}
              onClick={addVariant}
              className="disabled:opacity-50 bg-primary rounded px-3 h-9 text-white"
              type="button"
            >
              Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {variants.length > 0 &&
            variants.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex item-center gap-2 bg-secondary/20 rounded-full px-3 py-1 mt-3"
                >
                  <button
                    onClick={() =>
                      setVariants((prev) =>
                        prev.filter((variant) => variant !== item)
                      )
                    }
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-secondary/60 font-semibold text-xs capitalize">
                    {item}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
