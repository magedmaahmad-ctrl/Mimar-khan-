const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = path.join(__dirname, '../src/assets/uploads'); // Where you put new images
const TARGET_BASE_DIR = path.join(__dirname, '../src/assets/projects'); // Where they go
const DATA_FILE = path.join(__dirname, '../src/data/projectsData.ts');

const CATEGORIES = ['interior', 'commercial', 'residential', 'exterior'];

// Ensure directories exist
CATEGORIES.forEach(cat => {
    const dir = path.join(TARGET_BASE_DIR, cat);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to guess category from filename
function guessCategory(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('interior') || lower.includes('living') || lower.includes('kitchen')) return 'interior';
    if (lower.includes('office') || lower.includes('shop') || lower.includes('mall')) return 'commercial';
    if (lower.includes('facade') || lower.includes('garden') || lower.includes('landscape')) return 'exterior';
    return 'residential'; // Default
}

// Main function
function organize() {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.log(`Source directory ${SOURCE_DIR} does not exist. Please create it and put images there.`);
        return;
    }

    const files = fs.readdirSync(SOURCE_DIR);
    let newProjects = [];

    files.forEach((file, index) => {
        if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) return;

        const category = guessCategory(file);
        const projectId = `proj-${Date.now()}-${index}`;
        const projectDir = path.join(TARGET_BASE_DIR, category, projectId);

        if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir, { recursive: true });

        // Move file
        const oldPath = path.join(SOURCE_DIR, file);
        const newPath = path.join(projectDir, file);
        fs.renameSync(oldPath, newPath);

        console.log(`Moved ${file} to ${category}/${projectId}`);

        // Add to data (simplified for appending)
        // In a real app, you'd parse the existing TS file and append to the array.
        // For now, we just log what needs to be added.
        console.log(`TODO: Add project ${projectId} to projectsData.ts`);
    });
}

organize();
