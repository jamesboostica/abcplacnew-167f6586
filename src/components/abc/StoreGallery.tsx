import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  images: string[];
  alt: string;
};

/**
 * Responsive gallery: carousel with prev/next controls + click-to-open lightbox.
 * Shows 1 slide on mobile, 2 on tablet, 3 on desktop. Lightbox supports keyboard nav.
 */
export const StoreGallery = ({ images, alt }: Props) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
  }, [api]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        );
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <div>
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {images.map((src, i) => (
              <CarouselItem
                key={`${src}-${i}`}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden bg-abc-cream"
                  style={{ aspectRatio: "4 / 3" }}
                  aria-label={`Open image ${i + 1} of ${images.length}`}
                >
                  <img
                    src={src}
                    alt={`${alt} — image ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(13,13,13,0.18)" }}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-4">
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9A9A9A",
            }}
          >
            Tap any photo to enlarge
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous image"
              className="w-10 h-10 flex items-center justify-center border transition-colors disabled:opacity-40"
              style={{
                borderColor: "#0D0D0D",
                color: "#0D0D0D",
                background: "transparent",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Next image"
              className="w-10 h-10 flex items-center justify-center border transition-colors disabled:opacity-40"
              style={{
                borderColor: "#0D0D0D",
                color: "#0D0D0D",
                background: "transparent",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightbox !== null}
        onOpenChange={(o) => !o && setLightbox(null)}
      >
        <DialogContent
          className="max-w-[96vw] sm:max-w-[90vw] lg:max-w-[1100px] p-0 border-0 bg-transparent shadow-none"
        >
          {lightbox !== null && (
            <div className="relative bg-[#0D0D0D]">
              <img
                src={images[lightbox]}
                alt={`${alt} — image ${lightbox + 1}`}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white"
              >
                <X size={18} />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox(
                        (i) => (i === null ? 0 : (i - 1 + images.length) % images.length)
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox((i) => (i === null ? 0 : (i + 1) % images.length))
                    }
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white"
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {lightbox + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreGallery;