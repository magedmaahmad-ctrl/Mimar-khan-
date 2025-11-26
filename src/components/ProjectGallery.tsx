import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handlePrevious = () => {
        if (selectedImage) {
            const currentIndex = images.indexOf(selectedImage);
            const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
            setSelectedImage(images[previousIndex]);
        }
    };

    const handleNext = () => {
        if (selectedImage) {
            const currentIndex = images.indexOf(selectedImage);
            const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
            setSelectedImage(images[nextIndex]);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image}
                            alt={`${title} - View ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute right-4 top-4 text-white/70 hover:text-white"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {/* Left Arrow */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        <img
                            src={selectedImage}
                            alt={title}
                            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProjectGallery;
