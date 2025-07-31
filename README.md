# 📄 Resume Analyzer

[![Docker Pulls](https://img.shields.io/docker/pulls/medatta0/resume-analyzer-back-end?label=Backend%20Docker)](https://hub.docker.com/r/medatta0/resume-analyzer-back-end)
[![Docker Pulls](https://img.shields.io/docker/pulls/medatta0/resume-analyzer-front-end?label=Frontend%20Docker)](https://hub.docker.com/r/medatta0/resume-analyzer-front-end)

**Resume Analyzer** is a web application that analyzes your CV and provides personalized feedback based on job market requirements. It helps users identify **skill gaps** and receive **improvement suggestions** to better align with their target jobs.

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [📹 Demo](#-demo)
- [🌐 Live Demo](#-live-demo)
- [🐳 Docker Deployment](#-docker-deployment)
- [🧑‍💻 Getting Started Locally](#-getting-started-locally)
- [⚙️ Project Structure](#️-project-structure)
- [🔧 Development (Optional)](#-development-optional)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [📬 Contact](#-contact)

---

## 🚀 Features

- Upload your resume (PDF)
- Automatically extract and analyze your skills
- Get tailored feedback and skill recommendations
- Clean, responsive interface
- Dockerized for easy deployment

---

## 📹 Demo

🎥 Watch a short [demo video](https://vimeo.com/1106250649/b92af80445?share=copy)

---

## 🌐 Live Demo

Try it here: [https://medatta0.tech](https://medatta0.tech)

---

## 🐳 Docker Deployment

### Docker Images

- 🔹 **Frontend**: [`medatta0/resume-analyzer-front-end:latest`](https://hub.docker.com/r/medatta0/resume-analyzer-front-end)
- 🔹 **Backend**: [`medatta0/resume-analyzer-back-end:latest`](https://hub.docker.com/r/medatta0/resume-analyzer-back-end)

---

## 🧑‍💻 Getting Started Locally

### Prerequisites

- Docker & Docker Compose installed
- A valid **Gemini API key** (for resume analysis)

---

git clone https://github.com/MEDATTA0/resume-analyzer.git
cd resume-analyzer/backend

```

```

```bash
2. Create the .env File

You need to create a .env file in the backend directory to provide your Gemini API key.
Example .env File

GEMINI_API_KEY=your_gemini_api_key_here

Create It via Command Line

touch .env
echo "GEMINI_API_KEY=your_gemini_api_key_here" >> .env

    Replace your_gemini_api_key_here with your actual Gemini API key.
    If you don’t have one, you can get it from Google AI Studio or your Gemini provider.
```
