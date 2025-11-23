import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
    id: string;
    title: string;
    image: string;
    description: string;
    count: number;
}

const CategoryCard = ({ id, title, image, description, count }: CategoryCardProps) => {
    return (
        <Link
            to={`/projects/${id}`}
            className="group relative block h-[500px] w-full overflow-hidden rounded-2xl bg-gray-900"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="h-full w-full"
            >
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-60"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="mb-4 flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red text-xs font-bold text-white">
                        {count}
                    </span>
                    <span className="text-sm font-medium uppercase tracking-wider text-gray-300">
                        Projects
                    </span>
                </div>

                <h3 className="mb-3 text-4xl font-serif font-bold text-white">
                    {title}
                </h3>

                <p className="mb-6 max-w-md text-lg text-gray-300 opacity-0 transition-all duration-500 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    {description}
                </p>

                <div className="flex items-center text-red font-medium">
                    <span className="mr-2">Explore Category</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
