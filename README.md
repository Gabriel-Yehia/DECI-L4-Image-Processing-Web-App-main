Image Processing Web App

This is an image processing web application that allows users to resize and upload images. The app consists of a backend API built with Express.js and a frontend user interface implemented using HTML, CSS, and JavaScript.
For some reason this doesn't work very well so the only way for it to work correctly is by running "npm start" in terminal and opening the "index.html" 
file from the file explorer for it to work correctly

1. Features

View a gallery of available images
Resize images by specifying custom width and height
Upload new images in JPG or JPEG format
Backend API for image processing and serving resized images
Frontend user interface for interacting with the API

2. Usage for /public

Viewing Images

- The home page displays a gallery of available images.
- Click on an image to select it for resizing.

Resizing Images

- Select an image from the gallery or the dropdown menu.
- Enter the desired width and height for the resized image.
- Click the "Resize" button to generate the resized image.
- The URL of the resized image will be displayed below the form.

Uploading Images

- Click on the "Choose File" button in the upload section.
- Select a JPG or JPEG image file from your local machine.
- Click the "Upload" button to upload the image to the server.
- The uploaded image will be added to the gallery and available for resizing.

3. API Endpoints

- GET /images: Retrieves a list of available images.
- GET /images/:imageName: Retrieves a specific image by name.
  - Query parameters:
    - w: Width of the resized image (optional)
    - h: Height of the resized image (optional)
  - Example: http://localhost:8000/images/fjord.jpg?w=200&h=800
- POST /upload: Uploads a new image file.

4. Project Structure

The project structure is organized as follows:
```
├── src/
│   ├── controllers/
│   │   ├── ImagesController.ts
│   │   ├── IndexController.ts
│   │   └── UploadController.ts
│   ├── images/
│   │   ├── original/
│   │   └── thumbnails/
│   ├── tests/
│   │   ├── helpers/
│   │   ├── ImagesController.test.ts
│   │   ├── IndexController.test.ts
│   │   ├── UploadController.test.ts
│   │   ├── UtilFileExist.test.ts
│   │   ├── UtilGenerateFileName.test.ts
│   │   └── UtilResizeImage.test.ts
│   ├── utils/
│   │   ├── fileExist.ts
│   │   ├── generateFileName.ts
│   │   └── resizeImage.ts
│   ├── app.ts
│   ├── config.ts
│   ├── index.ts
│   └── routes.ts
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── package.json
└── README.md
```
- The `src` directory contains the backend source code.
  - The `controllers` directory contains the route handlers for different endpoints.
  - The `images` directory stores the original and resized images.
  - The `tests` directory contains the unit tests for the backend code.
  - The `utils` directory contains utility functions used in the backend.
  - `app.ts` is the main entry point for the Express application.
  - `config.ts` contains configuration variables for the backend.
  - `index.ts` is the entry point for the server.
  - `routes.ts` defines the API routes and their corresponding controllers.

- The `public` directory contains the frontend files.
  - `index.html` is the main HTML file for the frontend.
  - `script.js` contains the JavaScript code for the frontend functionality.
  - `style.css` contains the CSS styles for the frontend.

- `package.json` contains the project dependencies and scripts.
- `README.md` is the project documentation file.

Nothing else here honestly