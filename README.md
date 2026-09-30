# 🌍 AERIS Climate

## Adaptive Earth Observation Reasoning & Intelligence System for Climate Action

> **From Earth Observation to Climate Action.**

[![GitHub](https://img.shields.io/badge/GitHub-AERIS--Climate-181717?style=for-the-badge&logo=github)](https://github.com/lavanyasaxena01/AERIS-climatechange)
[![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge&logo=vercel)](YOUR_VERCEL_DEPLOYMENT_URL)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

---

## 🔗 Project Links

| Resource | Link |
|---|---|
| 🌐 **Live Demo** | (https://aeris-climatechange.vercel.app/)
| 💻 **GitHub Repository** | (https://github.com/lavanyasaxena01/AERIS-climatechange) |


---

# 🌎 Overview

**AERIS Climate** is an AI-powered Earth Observation intelligence platform designed to transform satellite observations into structured climate intelligence.

The platform brings together:

- 🛰️ Optical Earth Observation
- 📡 Synthetic Aperture Radar (SAR)
- 🔄 Temporal change detection
- 🌊 Flood intelligence
- 🌱 Vegetation monitoring
- 💧 Water anomaly monitoring
- 🗺️ Geospatial visualization
- ⚠️ Climate-risk assessment
- 🤖 AI-assisted climate reasoning
- 📊 Climate impact and decision-support analytics
- 📑 Automated climate intelligence reports

The core product idea is:

> **Satellite data tells us what changed. AERIS Climate helps explain what that change means.**

---

# 🌱 Problem Statement

Climate change is increasingly expressed through interconnected environmental changes such as:

- Flooding and inundation
- Vegetation degradation
- Water-body expansion or contraction
- Ecosystem stress
- Land-use change
- Increasing exposure of people and agricultural areas to climate hazards

Earth Observation satellites provide frequent, large-scale environmental observations, but raw satellite imagery is not directly actionable for most decision-makers.

A climate intelligence system needs to answer:

1. **What changed?**
2. **Where did it change?**
3. **How much area was affected?**
4. **Which environmental indicators changed?**
5. **What is the associated risk?**
6. **What evidence supports that assessment?**
7. **What adaptation actions should be considered?**

AERIS Climate is designed to bridge the gap between **Earth Observation data** and **climate-action intelligence**.

---

# 💡 Solution

AERIS converts environmental observations into a multi-stage climate intelligence pipeline:

```text
Earth Observation Data
        ↓
Data / Sensor Context
        ↓
Optical + SAR Analysis
        ↓
Temporal Change Detection
        ↓
 ┌──────────┬────────────┬───────────┐
 │          │            │           │
Flood     Vegetation    Water      Land
Analysis   Analysis    Analysis    Change
 │          │            │           │
 └──────────┴────────────┴───────────┘
                    ↓
           Climate Risk Engine
                    ↓
             AI Climate Analyst
                    ↓
       Climate Impact Intelligence
                    ↓
        Reports & Action Insights
```

---

# ✨ Key Features

## 1. 🛰️ Earth Observation Monitor

The application provides an interactive geospatial monitoring interface for climate-sensitive regions.

It combines regional context with satellite sensor information including:

- Sentinel-1 SAR
- Sentinel-2 MSI
- Landsat-8/9
- Sentinel-3 SLSTR

The platform displays:

- Region
- Country
- Biome
- Coordinates
- Primary hazard
- Observation date
- Baseline date
- Event date
- Sensor platforms

---

# 2. 🔄 Temporal Change Detection

AERIS provides an interactive before/after comparison workflow for identifying environmental changes between two observations.

### Multimodal concept

```text
Optical T1 ───────┐
Optical T2 ───────┤
                  │
SAR T1 ───────────┤
SAR T2 ───────────┘
        ↓
Multimodal Feature Fusion
        ↓
Change Detection
        ↓
Probability / Change Information
```

The current application exposes a change-detection API based on the project's configured **OpticalSARChangeNet-v2 (Gated Feature Fusion)** model context.

### Change metrics

- Total analyzed pixels
- Changed pixels
- Changed area
- Change percentage
- Detection confidence
- Coherence-loss indicator

### Interactive visualization

The UI includes a **Temporal Co-Registered Comparison Slider** for visually comparing:

- Optical observation before
- Optical observation after
- SAR backscatter context

---

# 3. 🌊 Flood Intelligence

AERIS provides a dedicated flood-analysis workflow.

The current application exposes flood-analysis information using a **Sen1Floods11 Dual-Sensor Inundation Segmenter** pipeline context.

### Flood metrics

- Inundated area
- Inundation percentage
- Estimated depth class
- Population in inundation zone
- Cropland affected
- Infrastructure criticality
- Severity

### SAR parameters

The flood-analysis response can also expose:

- Incidence angle
- Satellite pass
- Backscatter threshold

### Example pipeline

```text
Sentinel-1 SAR
       +
Optical Context
       ↓
Flood Analysis
       ↓
Inundation Estimation
       ↓
Exposure Assessment
       ↓
Climate Risk
```

---

# 4. 🌱 Vegetation Intelligence

AERIS uses the **Normalized Difference Vegetation Index (NDVI)** to represent vegetation conditions.

### Formula

```text
NDVI = (NIR - RED) / (NIR + RED)
```

The application provides:

- NDVI before
- NDVI after
- Delta NDVI
- Percentage change
- Vegetation health status
- Estimated canopy loss

The current implementation uses a **Sentinel-2 Level-2A Bottom-Of-Atmosphere (BOA) Reflectance** context.

### Applications

NDVI-based monitoring can support:

- Vegetation stress detection
- Ecosystem monitoring
- Flood-related vegetation impact assessment
- Agricultural monitoring
- Land degradation analysis

---

# 5. 💧 Water Intelligence

AERIS uses the **Normalized Difference Water Index (NDWI)** to represent water-surface dynamics.

### Formula

```text
NDWI = (GREEN - NIR) / (GREEN + NIR)
```

The water-analysis workflow exposes:

- NDWI before
- NDWI after
- Percentage change
- Water anomaly trend
- Water-surface dynamics

The system distinguishes between signals such as:

```text
Surge / expansion
        vs.
Recession / drought deficit
```

---

# 6. ⚠️ Climate Risk Engine

AERIS contains a transparent weighted climate-risk engine.

The default risk factors are:

| Factor | Weight |
|---|---:|
| Flood Severity | 35% |
| Vegetation Decline | 25% |
| Water Anomaly | 15% |
| Land-Use Change | 15% |
| Historical Trend | 10% |

### Risk formula

```text
Risk Score =
    (Flood Severity × w_f)
  + (Vegetation Decline × w_v)
  + (Water Anomaly × w_w)
  + (Land-Use Change × w_l)
  + (Historical Trend × w_h)
```

Weights are normalized before calculating the final score.

### Risk levels

| Score | Level |
|---:|---|
| 0–34 | LOW |
| 35–54 | MODERATE |
| 55–74 | HIGH |
| 75–100 | CRITICAL |

The risk engine also returns individual factor contributions so that users can understand how the score was constructed.

### Custom weights

The API supports optional custom weights for scenario analysis.

---

# 7. 🤖 AERIS AI Climate Analyst

AERIS includes an AI reasoning layer powered by the Google Gemini SDK when a valid `GEMINI_API_KEY` is available.

The AI receives structured climate information such as:

- Region
- Biome
- Hazard
- Sensors
- Change metrics
- Flood metrics
- NDVI
- NDWI
- Risk score
- Risk factors

It can generate:

- Executive summary
- Evidence
- Scientific reasoning
- Adaptation recommendations
- Sensor attribution

### Example questions

```text
What changed in this region?

Why is this region considered high risk?

Explain the vegetation decline.

What are the major environmental anomalies?

What evidence supports this risk assessment?

What adaptation actions should be considered?
```

### Grounded reasoning

The AI prompt is explicitly designed to use the structured evidence supplied by the application rather than inventing additional numerical observations.

---

# 8. 🧠 Deterministic AI Fallback

AERIS does not completely depend on an external AI API.

When `GEMINI_API_KEY` is unavailable, or when the Gemini request fails or times out, the backend falls back to deterministic, region-grounded reasoning based on the configured climate data.

This makes the application usable in demo environments where an external AI key is not available.

---

# 9. 🗺️ Interactive Climate Map

The Earth Observation Monitor provides an interactive map for exploring the configured climate regions.

Each region includes:

- Geographic center
- Zoom level
- Geographic bounds
- Polygon coordinates
- Hazard type
- Sensor platforms
- Observation dates

Users can select regions directly from the application and move between analysis modules.

---

# 10. 📊 Climate Intelligence Dashboard

The overview dashboard consolidates the most important environmental indicators.

It brings together:

- Total area analyzed
- Changed area
- Flood impact
- Vegetation change
- Water anomalies
- Population exposure
- Agricultural impact
- Climate risk
- Detection confidence

The UI is designed as a **Climate Intelligence Command Center**.

---

# 11. 📑 Climate Intelligence Reports

AERIS provides an API-driven climate report generation workflow.

A generated report can include:

### Region information

- Region ID
- Region name
- Country
- Biome
- Coordinates

### Observation window

- Baseline date
- Event date
- Last sensor acquisition

### Sensors

- Sensor platforms used for the configured region

### KPI summary

- Total analyzed area
- Changed area
- Change percentage
- Flood area
- Population exposed
- Cropland impacted
- Risk score
- Risk level
- Confidence

### Biophysical indices

- NDVI before
- NDVI after
- NDVI change
- NDWI before
- NDWI after
- NDWI change

### AI interpretation

- Summary
- Evidence
- Reasoning
- Adaptation recommendations
- Sensor attribution

---

# 12. 📈 Climate Impact & Market Intelligence

The application also contains a dedicated impact/market view intended to connect environmental risk with potential operational and economic consequences.

This creates a path toward future climate-risk applications in:

- Agriculture
- Infrastructure
- Insurance
- Water management
- Disaster response
- Environmental monitoring

---

# 13. 🎥 Presentation Mode

AERIS includes a dedicated Presentation Mode for demonstrations and hackathons.

The product story is structured as:

```text
OBSERVE
   ↓
DETECT
   ↓
QUANTIFY
   ↓
ASSESS
   ↓
EXPLAIN
   ↓
ACT
```

This allows the complete platform to be demonstrated as a single end-to-end climate intelligence workflow.

---

# 🌍 Example Climate Regions

The application contains preconfigured regions representing different environmental hazards and Earth Observation scenarios.

Examples include:

- Indus River Basin
- Lake Chad Basin
- Other configured climate-sensitive regions in `src/data/regionsData.ts`

Each region can define:

- Location
- Country
- Biome
- Hazard
- Sensor platforms
- Observation dates
- Change metrics
- Flood metrics
- NDVI
- NDWI
- Risk factors
- AI explanation
- Adaptation actions
- Visualization assets

---

# 🧩 System Architecture

```text
                        ┌───────────────────────┐
                        │ Earth Observation     │
                        │ Data / Region Context │
                        └───────────┬───────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │ Regional Data Layer  │
                        │ CLIMATE_REGIONS      │
                        └───────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          Change Detection     Flood Analysis    Biophysical
          Optical + SAR       SAR / Flood        Indicators
                 │                  │              │
                 │                  │        ┌─────┴─────┐
                 │                  │        │           │
                 │                  │       NDVI        NDWI
                 │                  │        │           │
                 └──────────────────┼────────┴───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Climate Risk Engine  │
                         │ Weighted Assessment  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Gemini AI / Fallback │
                         │ Climate Reasoning    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
             Dashboard          Reports          Presentation
                 │                  │                  │
                 └──────────────────┼──────────────────┘
                                    ▼
                         Climate Intelligence
```

---

# 🛠️ Technology Stack

## Frontend

- React 19
- TypeScript
- Vite 8
- Tailwind CSS
- Motion
- Leaflet
- Lucide React

## Backend

- Node.js
- Express 4
- TypeScript
- `tsx`
- Vite middleware in development
- Express static serving in production

## AI

- Google Gemini
- `@google/genai`
- Deterministic grounded fallback reasoning

## Earth Observation Concepts

- Sentinel-1 SAR
- Sentinel-2 MSI
- Landsat-8/9
- Sentinel-3 SLSTR
- Optical + SAR change detection
- NDVI
- NDWI
- Sen1Floods11 validation context

---

# 📁 Project Structure

```text
AERIS-climatechange/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │       ├── aeris_satellite_globe_*.jpg
│   │       ├── satellite_optical_before_*.jpg
│   │       ├── satellite_optical_after_*.jpg
│   │       └── satellite_sar_flood_*.jpg
│   │
│   ├── components/
│   │   ├── ai/
│   │   ├── change/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── flood/
│   │   ├── impact/
│   │   ├── layout/
│   │   ├── presentation/
│   │   ├── reports/
│   │   ├── risk/
│   │   ├── vegetation/
│   │   └── water/
│   │
│   ├── data/
│   │   └── regionsData.ts
│   │
│   ├── lib/
│   │   └── riskEngine.ts
│   │
│   ├── server/
│   │   └── gemini.ts
│   │
│   ├── types/
│   │   └── climate.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── bun.lock
└── README.md
```

---

# ⚡ Getting Started

## Prerequisites

Install:

- Node.js
- npm

Recommended Node.js version: **18+**

Verify:

```bash
node --version
npm --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/lavanyasaxena01/AERIS-climatechange.git
cd AERIS-climatechange
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

### Gemini API key

The `GEMINI_API_KEY` is optional for the basic application workflow.

If the key is not supplied, AERIS uses its deterministic grounded fallback reasoning layer.

**Never commit a real API key to GitHub.**

---

# ▶️ Run the Application

## Development

```bash
npm run dev
```

The Express server starts the Vite development environment.

Open:

```text
http://localhost:3000
```

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the Vite build:

```bash
npm run preview
```

Start the Express production server:

```bash
npm start
```

The server uses the `PORT` environment variable when supplied and otherwise defaults to port `3000`.

---

# 🧪 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production frontend |
| `npm start` | Start production Express server |
| `npm run preview` | Preview Vite production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove generated build/server artifacts |

---

# 🔌 Backend API

The Express server exposes the following endpoints.

## Health

```http
GET /health
```

Returns:

- Server status
- AERIS version
- Model configuration
- AI reasoning mode

---

## Regions

```http
GET /api/regions
```

Returns the configured climate-monitoring regions.

---

## Demo

```http
GET /api/demo
```

Returns the default demonstration region and demo dataset information.

---

## Full Analysis

```http
POST /api/analyze
Content-Type: application/json
```

Example:

```json
{
  "regionId": "indus-basin"
}
```

Optional custom risk weights can also be supplied.

---

## Change Detection

```http
POST /api/change-detection
Content-Type: application/json
```

Example:

```json
{
  "regionId": "indus-basin"
}
```

Returns:

- Model context
- Optical bands
- SAR polarization
- Spatial resolution
- Pixel statistics
- Changed area
- Confidence
- Visualization layers

---

## Flood Analysis

```http
POST /api/flood-analysis
Content-Type: application/json
```

Returns:

- Inundated area
- Inundation percentage
- Estimated depth class
- Population exposure
- Cropland impact
- Infrastructure criticality
- Severity
- SAR parameters

---

## Vegetation Analysis

```http
POST /api/vegetation-analysis
Content-Type: application/json
```

Returns:

- NDVI before
- NDVI after
- Delta NDVI
- Percentage change
- Vegetation health status
- Canopy-loss estimate

---

## Water Analysis

```http
POST /api/water-analysis
Content-Type: application/json
```

Returns:

- NDWI before
- NDWI after
- Percentage change
- Water anomaly trend
- Water-surface dynamics

---

## Climate Risk

```http
POST /api/risk-analysis
Content-Type: application/json
```

Example:

```json
{
  "regionId": "indus-basin",
  "customWeights": {
    "floodSeverity": 0.35,
    "vegetationDecline": 0.25,
    "waterAnomaly": 0.15,
    "landUseChange": 0.15,
    "historicalTrend": 0.10
  }
}
```

---

## AI Climate Analyst

```http
POST /api/ai/query
Content-Type: application/json
```

Example:

```json
{
  "regionId": "indus-basin",
  "query": "What changed in this region and why does it matter?"
}
```

Returns:

- Query
- Region
- AI answer
- Summary
- Evidence
- Adaptation recommendations
- Sensor attribution
- Timestamp

---

## Climate Report

```http
POST /api/report
Content-Type: application/json
```

Example:

```json
{
  "regionId": "indus-basin"
}
```

Returns a structured climate-intelligence report including:

- Region information
- Observation window
- Sensors
- KPIs
- Risk calculation
- NDVI
- NDWI
- AI interpretation

---

# ☁️ Vercel Deployment

## Live Deployment

👉 **[Open AERIS Climate](YOUR_VERCEL_DEPLOYMENT_URL)**

> Replace `YOUR_VERCEL_DEPLOYMENT_URL` with your actual Vercel URL.

---

## Deployment Requirements

Before deploying:

```bash
npm install
npm run lint
npm run build
```

Make sure the production build completes successfully.

If Gemini AI is enabled, configure the following Vercel environment variable:

```text
GEMINI_API_KEY
```

---

## Important Production Note

AERIS currently uses an Express server through `server.ts`.

The application is structured so that:

- Vite handles the frontend build
- Express handles API routes
- Express serves the production `dist` directory
- The development server uses Vite middleware

Therefore, the deployment configuration should preserve the Express runtime rather than treating the project as a static-only Vite application.

---

# 🖼️ Production Image Assets

The application contains static Earth Observation demonstration imagery.

These assets are imported through the Vite asset pipeline so that production builds generate deployment-safe asset URLs.

Do **not** reference source assets using runtime URLs such as:

```text
/src/assets/images/example.jpg
```

Instead, import them through the Vite module system or place genuinely public assets under `public/`.

This prevents development-only paths from breaking after deployment.

---

# 🧪 Demo Dataset

The current application is a **functional prototype/demo**.

The configured region data and imagery are used to demonstrate the complete product workflow.

The UI explicitly indicates:

```text
DEMO DATASET ACTIVE
```

The `/api/analyze` endpoint also returns:

```json
{
  "is_demo": true
}
```

Therefore, the displayed results should be interpreted as **demonstration climate intelligence**, not as a live official environmental alert.

---

# 🛰️ Real Earth Observation Roadmap

AERIS is designed to evolve from the current demonstration layer into a real Earth Observation processing platform.

## Phase 1 — Current Prototype

```text
Configured Region Data
        ↓
Demo Satellite Imagery
        ↓
Climate Analysis UI
        ↓
Risk Engine
        ↓
AI Interpretation
```

## Phase 2 — Real Satellite Processing

```text
Sentinel-1
Sentinel-2
        ↓
Data Acquisition
        ↓
Preprocessing
        ↓
Model Inference
        ↓
Change / Flood / Index Maps
```

## Phase 3 — Historical Monitoring

```text
Multiple Observation Dates
        ↓
Time-Series Analysis
        ↓
Environmental Trend Detection
        ↓
Climate Risk Evolution
```

## Phase 4 — Continuous Climate Intelligence

```text
Satellite Ingestion
        ↓
Automated Analysis
        ↓
Change Detection
        ↓
Risk Assessment
        ↓
AI Reasoning
        ↓
Alerts & Decision Support
```

---

# 🔬 Scientific Indicators

## NDVI

The Normalized Difference Vegetation Index is calculated as:

```text
NDVI = (NIR - RED) / (NIR + RED)
```

AERIS uses temporal NDVI differences to represent vegetation change.

---

## NDWI

The Normalized Difference Water Index is calculated as:

```text
NDWI = (GREEN - NIR) / (GREEN + NIR)
```

AERIS uses temporal NDWI differences to represent water-related changes.

---

# 🎯 Potential Applications

AERIS Climate can serve as a foundation for:

### 🌊 Disaster Management

- Flood extent monitoring
- Inundation assessment
- Population exposure analysis
- Agricultural impact assessment

### 🌳 Ecosystem Monitoring

- Vegetation degradation
- Ecosystem stress
- Land-cover change

### 💧 Water Management

- Water-body monitoring
- Water-surface anomalies
- Drought-related changes

### 🌾 Agriculture

- Crop-area exposure
- Vegetation stress
- Flood impact

### 🏙️ Urban & Infrastructure Planning

- Environmental change
- Climate exposure
- Resilience planning

### 🛡️ Risk & Insurance

- Spatial exposure assessment
- Environmental risk intelligence
- Climate-risk monitoring

### 🏛️ Public-Sector Decision Support

- Climate adaptation planning
- Disaster response
- Environmental monitoring

---

# 📈 Scalability

The platform is modular.

New environmental intelligence modules can be added without replacing the core architecture.

Potential future modules include:

- 🌡️ Heat-island detection
- 🌵 Drought monitoring
- 🔥 Wildfire impact
- 🌲 Deforestation detection
- 🧊 Glacier retreat
- 🌊 Coastal erosion
- 🌾 Crop stress
- 🏙️ Urban expansion
- 🌫️ Air-quality intelligence

The architecture can therefore evolve from a climate-change prototype into a broader **Earth Observation Intelligence Platform**.

---

# 💼 Market & Product Potential

AERIS can support multiple climate-intelligence use cases.

| Customer / Sector | Potential Value |
|---|---|
| Government | Climate adaptation and disaster intelligence |
| Disaster Management | Faster environmental assessment |
| Agriculture | Climate exposure and crop monitoring |
| Insurance | Spatial climate-risk intelligence |
| Infrastructure | Climate resilience planning |
| Water Utilities | Water anomaly monitoring |
| NGOs | Ecosystem and environmental monitoring |
| Research | Satellite analytics and experimentation |

The long-term product direction is a subscription/API-based Earth Observation intelligence platform where organizations can monitor selected regions continuously.

---

# 🌱 Climate Action & SDG Alignment

AERIS Climate aligns with climate and environmental monitoring objectives associated with:

| SDG | Relevance |
|---|---|
| **SDG 6 — Clean Water and Sanitation** | Water monitoring and anomaly analysis |
| **SDG 11 — Sustainable Cities and Communities** | Climate-resilient planning |
| **SDG 13 — Climate Action** | Climate-risk monitoring and adaptation |
| **SDG 15 — Life on Land** | Vegetation and ecosystem monitoring |

---

# 🏆 Hackathon Demo Flow

A recommended live demonstration sequence is:

### 01 — Select a Region

Choose a climate-sensitive region.

### 02 — Open the Monitor

Show the geographic context and sensor information.

### 03 — Run Analysis

Trigger the AERIS processing workflow.

### 04 — Show Change Detection

Use the temporal slider to compare the observations.

### 05 — Show Flood Intelligence

Explain:

- Flood extent
- Exposure
- Severity
- Agricultural impact

### 06 — Show Vegetation Intelligence

Explain the NDVI shift.

### 07 — Show Water Intelligence

Explain the NDWI anomaly.

### 08 — Open Climate Risk

Show the overall risk score and factor contributions.

### 09 — Ask AERIS AI

Ask:

> **"What changed here and why does it matter?"**

### 10 — Generate the Report

Finish with a structured climate-intelligence report and adaptation recommendations.

---

# 🧠 Explainability

AERIS is designed to make its risk assessment interpretable.

Instead of returning only:

```text
RISK = 78
```

the system exposes:

```text
Flood Severity       → contribution
Vegetation Decline   → contribution
Water Anomaly        → contribution
Land-Use Change      → contribution
Historical Trend     → contribution
```

This allows users to understand the factors contributing to the calculated score.

---

# 🔐 Environment Variables

The project uses:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
PORT=3000
```

### `GEMINI_API_KEY`

Optional API key for Gemini-powered climate reasoning.

### `APP_URL`

Application URL used by the hosting environment.

### `PORT`

Server port. The application defaults to `3000` when it is not provided.

---

# ⚠️ Data & Scientific Disclaimer

AERIS Climate is currently a **prototype/demo climate-intelligence platform**.

Some regional observations, metrics, visualization assets, and analysis outputs are configured demonstration data.

They should not be interpreted as:

- official satellite measurements
- government-issued climate alerts
- official disaster assessments
- operational emergency warnings
- certified climate-risk assessments

When the platform is connected to real Earth Observation datasets, production workflows should preserve and expose appropriate metadata such as:

- Sensor/platform
- Acquisition date
- Spatial resolution
- Processing level
- Geographic reference
- Model version
- Confidence
- Dataset provenance

AERIS Climate is intended as a **decision-support and climate-intelligence prototype**, not as a replacement for official environmental or disaster-management systems.

---

# 🧭 Future Vision

The long-term vision of AERIS Climate is to move from:

```text
STATIC DEMONSTRATION
        ↓
REAL SATELLITE DATA
        ↓
AUTOMATED ANALYSIS
        ↓
CONTINUOUS MONITORING
        ↓
PREDICTIVE CLIMATE INTELLIGENCE
        ↓
DECISION SUPPORT
        ↓
CLIMATE ACTION
```

The goal is to make complex Earth Observation data understandable and actionable for organizations working on climate resilience.

---

# 👩‍💻 Development

AERIS Climate brings together:

```text
Artificial Intelligence
        +
Earth Observation
        +
Geospatial Intelligence
        +
Climate Analytics
        +
Decision Support
```

---

# 🔗 Links

### 🌐 Live Application

**[AERIS Climate — Live Demo](https://aeris-climatechange.vercel.app/))**

### 💻 GitHub

**[AERIS Climate Repository](https://github.com/lavanyasaxena01/AERIS-climatechange)**

---

# 🌍 AERIS Climate

## Adaptive Earth Observation Reasoning & Intelligence System for Climate Action

> **Observe. Detect. Understand. Act.**

---

<p align="center">
  <strong>🛰️ From Earth Observation to Climate Action.</strong>
</p>
