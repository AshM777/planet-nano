import sharp from 'sharp';
import path from 'path';

const inputPath = 'public/images/profile.png';
const outputPath = 'public/images/profile-optimized.webp';

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .resize(400) // Resize to 400px width while maintaining aspect ratio
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toFile(outputPath);
    
    console.log('Image optimized successfully!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage(); 