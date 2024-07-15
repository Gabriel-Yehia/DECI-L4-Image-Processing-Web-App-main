import express from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';

const app = express();
const PORT = process.env.PORT || 8000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../src/images/original'));
    },
    filename: (req, file, cb) => {
        // Remove the timestamp and keep the original file name
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images/original', express.static(path.join(__dirname, '../src/images/original')));
app.use('/images/thumbnails', express.static(path.join(__dirname, '../src/images/thumbnails')));

// Middleware to parse JSON requests
app.use(express.json());

// Resize image endpoint
app.get('/images/thumbnails/:imageName', async (req, res) => {
    const { imageName } = req.params;
    const { w, h } = req.query;

    if (!w || !h) {
        return res.status(400).send('Width and height must be provided');
    }

    const width = parseInt(w as string);
    const height = parseInt(h as string);

    const originalImagePath = path.join(__dirname, '../src/images/original', imageName);

    // Create a unique filename for each resized image
    const thumbnailImageName = `${path.parse(imageName).name}-w${width}-h${height}${path.extname(imageName)}`;
    const thumbnailImagePath = path.join(__dirname, '../src/images/thumbnails', thumbnailImageName);

    try {
        // Check if the resized image already exists
        if (fs.existsSync(thumbnailImagePath)) {
            res.sendFile(thumbnailImagePath);
        } else {
            await sharp(originalImagePath)
                .resize(width, height)
                .toFile(thumbnailImagePath);
            res.sendFile(thumbnailImagePath);
        }
    } catch (error) {
        console.error('Error resizing image:', error);
        res.status(500).send('Error resizing image');
    }
});

// Fetch the list of images from the 'original' directory
app.get('/api/images', (req, res) => {
    const imagePath = path.join(__dirname, '../src/images/original');
    fs.readdir(imagePath, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
            res.status(500).json({ message: 'Failed to list images' });
        } else {
            res.json(files);
        }
    });
});

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } else {
        res.status(400).json({ message: 'Failed to upload file' });
    }
});

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
