import project1 from "@/assets/projects/mourad-elgendy/main.jpg";
import project1_g1 from "@/assets/projects/mourad-elgendy/gallery1.jpg";
import project1_g2 from "@/assets/projects/mourad-elgendy/gallery2.jpg";
import project1_g3 from "@/assets/projects/mourad-elgendy/gallery3.jpg";

import project2 from "@/assets/projects/hassen-mo-hassen/main.jpg";
import project2_g1 from "@/assets/projects/hassen-mo-hassen/gallery1.jpg";
import project2_g2 from "@/assets/projects/hassen-mo-hassen/gallery2.jpg";

import project3 from "@/assets/projects/yasser-zaki/main.jpg";
import project3_g1 from "@/assets/projects/yasser-zaki/gallery1.jpg";
import project3_g2 from "@/assets/projects/yasser-zaki/gallery2.jpg";

import project4 from "@/assets/projects/kh-elfaky/main.jpg";
import project4_g1 from "@/assets/projects/kh-elfaky/gallery1.jpg";

import project5 from "@/assets/project (5).JPG";
import project6 from "@/assets/project (6).jpg";
import project7 from "@/assets/project (7).jpg";
import project8 from "@/assets/project (8).jpg";
import project9 from "@/assets/project (9).jpg";
import project10 from "@/assets/project (10).jpg";
import project11 from "@/assets/project (11).jpg";
import project12 from "@/assets/project (12).jpg";
import project13 from "@/assets/project (13).jpg";

export interface Project {
    id: string;
    slug: string;
    title: string;
    categories: string[];
    location: string;
    client: string;
    status: "Completed" | "In Progress" | "Concept";
    summary: string;
    description: string;
    features: string[];
    images: string[];
    specifications: {
        area: string;
        floors?: string;
        units?: string;
        parking?: string;
    };
}

const localImages = [
    project1, project2, project3, project4, project5,
    project6, project7, project8, project9, project10,
    project11, project12, project13
];

// Helper to generate unique Unsplash architecture images
const getUnsplashImage = (index: number) =>
    `https://images.unsplash.com/photo-${1500000000000 + index}?auto=format&fit=crop&w=1600&q=80`;

const generateProjects = (): Project[] => {
    const projects: Project[] = [];
    const categoryList = ["interior", "commercial", "residential", "exterior"];

    for (let i = 0; i < 30; i++) {
        const isLocal = i < localImages.length;
        const image = isLocal ? localImages[i] : getUnsplashImage(i);

        // Ensure gallery images are also unique-ish or at least valid
        let galleryImages: string[];
        if (i === 0) {
            galleryImages = [project1, project1_g1, project1_g2, project1_g3];
        } else if (i === 1) {
            galleryImages = [project2, project2_g1, project2_g2];
        } else if (i === 2) {
            galleryImages = [project3, project3_g1, project3_g2];
        } else if (i === 3) {
            galleryImages = [project4, project4_g1];
        } else {
            galleryImages = isLocal
                ? [image, localImages[(i + 1) % localImages.length]] // Fallback to another local for gallery
                : [image, getUnsplashImage(i + 100)]; // Different unsplash for gallery
        }

        const isMouradElgendy = i === 0;
        const isHassenMoHassen = i === 1;
        const isYasserZaki = i === 2;
        const isKhElfaky = i === 3;

        let title = `Project ${i + 1} ${["Residence", "Tower", "Plaza", "Villa", "Loft"][i % 5]}`;
        let slug = `project-${i + 1}`;
        let categories = [categoryList[i % categoryList.length]];

        if (isMouradElgendy) {
            title = "Dr. Mourad Elgendy building";
            slug = "dr-mourad-elgendy-building";
            categories = ["residential", "exterior"];
        } else if (isHassenMoHassen) {
            title = "Eng. Hassen Mo. Hassen";
            slug = "eng-hassen-mo-hassen";
            categories = ["residential", "exterior"];
        } else if (isYasserZaki) {
            title = "Mr. Yasser Zaki";
            slug = "mr-yasser-zaki";
            categories = ["residential", "exterior"];
        } else if (isKhElfaky) {
            title = "Mr. Kh. Elfaky";
            slug = "mr-kh-elfaky";
            categories = ["residential", "exterior"];
        }

        projects.push({
            id: `proj-${i + 1}`,
            slug,
            title,
            categories,
            location: ["Dubai, UAE", "Riyadh, KSA", "London, UK", "Cairo, Egypt", "Doha, Qatar"][i % 5],
            client: `Client ${i + 1}`,
            status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "In Progress" : "Concept",
            summary: "A visionary architectural endeavor redefining modern living and sustainable design.",
            description: "This project represents a culmination of modern architectural principles, blending functionality with aesthetic excellence. The design focuses on sustainable materials, natural light optimization, and seamless integration with the surrounding environment.",
            features: ["Sustainable Design", "Smart Home Integration", "Panoramic Views", "Green Spaces"],
            images: galleryImages,
            specifications: {
                area: `${2000 + i * 100} sqm`,
                floors: `${5 + (i % 20)}`,
                units: i % 2 === 0 ? `${10 + i}` : undefined,
                parking: "Underground"
            }
        });
    }
    return projects;
};

export const projectsData = generateProjects();
