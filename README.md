# Hospital Assignments Application

## Overview

The Hospital Assignments Application is a web-based application designed to allow users to view and filter assignments of doctors to operating rooms across various hospitals. Users can filter assignments based on hospital, theatre, operating room, specialty, and doctor.

## Functional Requirements

### User Interface

#### Filters Component

- **Hospital Filter**: Dropdown to select a hospital. When a hospital is selected, the theatre and operating room filters should update accordingly.
- **Theatre Filter**: Dropdown to select a theatre within the selected hospital. This should be disabled if no hospital is selected.
- **Operating Room Filter**: Dropdown to select an operating room within the selected theatre. This should be disabled if no theatre is selected.
- **Specialty Filter**: Dropdown to select a specialty. This should be available regardless of other filters.
- **Doctor Search**: Text input to search for doctors by name. This should filter the dropdown results dynamically as the user types.
- **Clear Filters Button**: Button to clear all filters and reset the application to its default state.

#### Assignments Table

- **Columns**:
  - Hospital
  - Theatre
  - Operating Room
  - Specialty
  - Doctors
- **Rows**: Display assignments filtered based on the selected criteria.

### Data Handling

- **Data Source**: The application should fetch data from a predefined data source (hospitalData).
- **Sorting**:
  - Specialties and doctors should be displayed in alphabetical order in their respective dropdowns.

### Interactions

- **Filter Selection**:
  - Changing the hospital filter should reset the theatre and operating room filters.
  - Changing the specialty filter should reset the hospital, theatre, and operating room filters.
  - Typing in the doctor search should dynamically filter the doctor results and highlight the matching entries.
  - Selecting a doctor from the dropdown using the arrow keys and pressing Enter or Tab should populate the doctor search input and filter the results accordingly.

### Accessibility

- **Keyboard Navigation**:
  - Users should be able to navigate through the doctor search results using the arrow keys.
  - Pressing Enter or Tab should select the focused doctor and update the filters.

## Non-Functional Requirements

### Performance

- The application should load and respond to user interactions within 2 seconds.

### Scalability

- The application should be able to handle up to 1,000 hospitals, 10,000 theatres, and 100,000 doctors without performance degradation.

### Usability

- The application should be intuitive and easy to use for both technical and non-technical users.
- The UI should be responsive and function well on various devices (desktops, tablets, mobile phones).

### Maintainability

- The codebase should be organised and modular to facilitate easy maintenance and future enhancements.
- The project should follow best practices for React development and TypeScript usage.

## Technical Requirements

### Development Architecture

- **Language**: TypeScript
- **Framework**: React
- **State Management**: React Hooks
- **Styling**: CSS

### Project Structure

```perl
my-app/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── assets/ # Static assets (images, fonts, etc.)
│ ├── components/ # Reusable components
│ │ ├── Filters.tsx
│ │ └── ...
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ │ ├── HomePage.tsx
│ │ └── ...
│ ├── services/ # API calls and external services
│ │ └── api.ts
│ ├── styles/ # CSS and styled-components
│ │ └── App.css
│ ├── tests/ # Test files
│ │ ├── mocks/ # Mock data
│ │ │ └── data.ts
│ │ └── tests/ # Test cases
│ │ └── Filters.test.tsx
│ ├── utils/ # Utility functions
│ ├── App.tsx
│ ├── index.tsx
│ └── ...
├── .github/
│ └── workflows/ # GitHub Actions workflows
│ └── ci.yml
├── .babelrc # Babel configuration
├── jest.config.js # Jest configuration
├── tsconfig.json # TypeScript configuration
├── package.json
└── ...
```

### Testing

- **Testing Framework**: Jest with React Testing Library
- **Coverage**: 80% test coverage for all components and functions
- **Continuous Integration**: GitHub Actions configured to run tests on each check-in

### Dependencies

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript
- **Jest**: A delightful JavaScript Testing Framework
- **React Testing Library**: A lightweight solution for testing React components
- **Babel**: A JavaScript compiler

### Configuration Files

- `babel.config.js`: Babel configuration
- `jest.config.js`: Jest configuration
- `tsconfig.json`: TypeScript configuration
- `.github/workflows/ci.yml`: GitHub Actions CI configuration

## Installation and Setup

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later) or yarn

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/hospital-assignments-app.git
    cd hospital-assignments-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the development server**:

    ```bash
    npm start
    # or
    yarn start
    ```

4. **Run tests**:

    ```bash
    npm test
    # or
    yarn test
    ```

## Future Enhancements

- **User Authentication**: Implement user login and authentication.
- **Data Persistence**: Integrate with a backend API to fetch and persist data.
- **Advanced Filtering**: Add more advanced filtering options (e.g., by date, time).
- **Notifications**: Implement notifications for new assignments or updates.

## Building and Deployment

### Development Environment

To build the project for development purposes, you can use the following command:

```bash
npm run build
# or
yarn build

# then
npm install -g serve

# then
serve -s build -l 5000
```

This will create a `build` directory with the production build of your app. Note that for development purposes, you typically don't need to build the project; you can use the development server instead.

### Production Environment

To deploy the application in a production environment, follow these steps:

1. **Build the Application**:

   ```bash
   npm run build
   # or
   yarn build
   ```

   This command will create an optimized production build of the app in the `build` directory.

2. **Deploy to GitHub Pages**:

   Ensure `gh-pages` is installed:

   ```bash
   npm install gh-pages --save-dev
   # or
   yarn add gh-pages --dev
   ```

   Add the following scripts to your `package.json`:

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

   Deploy the app:

   ```bash
   npm run deploy
   ```

   Your application will be deployed to GitHub Pages at `https://yourusername.github.io/your-repo-name`.

3. **Deploy to Netlify**:

   - **Connect Your Repository**: Sign up or log in to Netlify and create a new site from Git.
   - **Build Settings**: Netlify will automatically detect the React project. If not, set the build command to `npm run build` and the publish directory to `build`.
   - **Deploy**: Deploy your site and get a live URL.

4. **Serve the Build Locally**:

   To serve the production build locally, you can use a simple HTTP server like `serve`:

   ```bash
   npm install -g serve
   serve -s build
   ```

   This will start a local server and serve your production build at `http://localhost:5000`.

### Summary of Commands

- **Install dependencies**:

  ```bash
  npm install
  # or
  yarn install
  ```

- **Run development server**:

  ```bash
  npm start
  # or
  yarn start
  ```

- **Build for production**:

  ```bash
  npm run build
  # or
  yarn build
  ```

- **Deploy to GitHub Pages**:

  ```bash
  npm run deploy
  ```

- **Serve production build locally**:

  ```bash
  serve -s build
  ```
