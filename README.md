<div align="center">

# 💡 Smart LED Dashboard

### AI Powered IoT Smart LED Controller using Voice, Hand Gestures & Adafruit IO

<img src="https://img.shields.io/badge/React-19-blue?logo=react"/>
<img src="https://img.shields.io/badge/Vite-Latest-purple?logo=vite"/>
<img src="https://img.shields.io/badge/MediaPipe-AI-orange"/>
<img src="https://img.shields.io/badge/ESP8266-IoT-green"/>
<img src="https://img.shields.io/badge/Adafruit%20IO-MQTT-red"/>
<img src="https://img.shields.io/badge/License-MIT-blue"/>

A modern AI-powered IoT dashboard that allows users to control ESP8266/NodeMCU-based LED devices using **Hand Gestures**, **Voice Commands**, **Brightness Slider**, and **Cloud Communication through Adafruit IO**.

</div>

---

# 📖 Overview

Smart LED Dashboard is an intelligent IoT web application designed to provide seamless control over one or multiple Smart LED devices connected through Adafruit IO.

The application combines Artificial Intelligence, Computer Vision, Voice Recognition, and IoT technologies to create an intuitive user experience. Users can control LED brightness using hand gestures detected by MediaPipe AI, issue voice commands, manually adjust brightness, discover nearby devices, and manage multiple smart devices from a single dashboard.

The project is built with **React + Vite**, integrates **MediaPipe Tasks Vision** for real-time hand tracking, and communicates with ESP8266 devices using the **Adafruit IO REST API**.

---

# ✨ Features

## 🤖 AI Hand Gesture Control

- Real-time hand tracking
- Finger counting using MediaPipe AI
- LED brightness control using finger gestures
- Live hand landmark visualization
- Automatic brightness calculation

---

## 🎙 Voice Control

Control your Smart LED using voice commands.

Example:

- Turn On Light
- Turn Off Light
- Brightness 50%
- Brightness 100%

---

## 💡 Brightness Control

- Manual brightness slider
- AI gesture brightness control
- Smooth PWM brightness adjustment
- Instant cloud synchronization

---

## 📷 Camera System

- Front Camera Support
- Rear Camera Support
- Camera Flip
- Mobile Browser Support
- Desktop Browser Support

---

## 🌐 Device Discovery

Automatically detects online ESP8266 devices using heartbeat messages.

Features include:

- Online Detection
- Offline Detection
- Live Status
- Device Discovery
- Device Registration

---

## 📱 Device Manager

Manage multiple smart devices.

Features:

- Save Devices
- Select Device
- Delete Device
- Device Status
- Device Information

---

## 🌍 Cloud Communication

Uses Adafruit IO REST API for cloud communication.

Supports:

- Device ON/OFF
- Brightness
- Reset Device
- Fleet Broadcast
- Heartbeat Monitoring

---

## 📊 Dashboard

Interactive dashboard displaying:

- Connected Device
- Device Status
- Camera Feed
- Gesture Detection
- Brightness Percentage
- Finger Count
- Voice Control
- Manual Controls

---

# 🏗 System Architecture

```text
                        ┌───────────────────────┐
                        │      User             │
                        └──────────┬────────────┘
                                   │
                 Voice Commands / Hand Gestures
                                   │
                                   ▼
                     ┌────────────────────────┐
                     │ React Smart Dashboard  │
                     └──────────┬─────────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
     MediaPipe AI       Voice Recognition     Device Manager
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                                ▼
                      Adafruit IO REST API
                                │
                                ▼
                      Adafruit Cloud Feeds
                                │
                                ▼
                      ESP8266 / NodeMCU
                                │
                                ▼
                            LED Device
```

---

# 🛠 Technology Stack

## Frontend

- React 19
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

---

## Artificial Intelligence

- MediaPipe Tasks Vision
- Hand Landmarker
- Finger Detection
- Computer Vision

---

## IoT

- ESP8266 NodeMCU
- Adafruit IO
- REST API
- MQTT Heartbeat

---

## Voice Recognition

- Web Speech API
- Browser Speech Recognition

---

## Networking

- Fetch API
- REST Communication
- JSON
- HTTPS

---

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Render
- Arduino IDE

---

# 📁 Project Structure

```text
smartled-react/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── BrightnessControl.jsx
│   │   ├── DeviceCard.jsx
│   │   ├── GestureControl.jsx
│   │   ├── HandTracker.jsx
│   │   ├── Navbar.jsx
│   │   ├── VoiceControl.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── DeviceManager.jsx
│   │   └── Home.jsx
│   │
│   ├── services/
│   │   ├── adafruitApi.js
│   │   ├── discoveryService.js
│   │   └── heartbeat.js
│   │
│   ├── utils/
│   │   ├── fingerCounter.js
│   │   ├── handTracker.js
│   │   ├── landmarkDrawer.js
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🚀 Core Modules

| Module | Description |
|---------|-------------|
| Dashboard | Main control panel |
| Hand Tracker | AI hand detection using MediaPipe |
| Voice Control | Speech recognition and command processing |
| Device Discovery | Detect online ESP8266 devices |
| Device Manager | Manage saved devices |
| Brightness Control | Manual PWM brightness adjustment |
| Gesture Control | Brightness control using finger gestures |
| Adafruit Service | Cloud communication |
| Heartbeat Service | Online/offline monitoring |

---

# ⭐ Key Highlights

- AI Powered Hand Gesture Recognition
- Voice Controlled Smart LED
- Cloud-Based IoT Communication
- Multi Device Support
- Mobile Friendly
- Responsive UI
- Real-Time Device Discovery
- Automatic Heartbeat Monitoring
- ESP8266 Compatible
- Adafruit IO Integration
- React + Vite Architecture
- Production Ready Dashboard

- ---

# ⚙️ Installation Guide

Follow the steps below to set up the project on your local machine.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/smartled-react.git
```

Navigate into the project directory:

```bash
cd smartled-react
```

---

## 2️⃣ Install Dependencies

Install all required npm packages:

```bash
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

To access the application from another device on the same network:

```bash
npm run dev -- --host
```

---

# 📦 Required Dependencies

The project uses the following major libraries:

| Package | Purpose |
|----------|----------|
| React | Frontend Framework |
| Vite | Development Server & Build Tool |
| MediaPipe Tasks Vision | AI Hand Tracking |
| React Router DOM | Client-side Routing |
| Axios | HTTP Requests |
| Framer Motion | Animations |
| MQTT | IoT Communication |
| React Icons | UI Icons |

Install dependencies using:

```bash
npm install
```

---

# ☁️ Adafruit IO Setup

This project communicates with ESP8266 devices through **Adafruit IO REST API**.

---

## Step 1: Create an Adafruit IO Account

Visit:

https://io.adafruit.com/

Create a free account.

---

## Step 2: Obtain Your Credentials

Open:

```
My Key
```

Copy:

- Username
- Active Key

Example:

```
Username:
john123

Active Key:
aio_xxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 3: Create Required Feeds

Create the following feeds.

### Device Feed

Example:

```
smartled-setup6
```

This feed is used to send LED control commands.

---

### Fleet Broadcast Feed

```
smartled-all
```

Used for broadcasting commands to all devices.

---

### Heartbeat Feed

```
smartled-registry
```

Used by ESP8266 devices to announce themselves as online.

---

# 🔐 Environment Variables

Create a file named:

```
.env
```

in the project root.

Example:

```env
VITE_AIO_USERNAME=YOUR_ADAFRUIT_USERNAME
VITE_AIO_KEY=YOUR_ADAFRUIT_ACTIVE_KEY
```

Example:

```env
VITE_AIO_USERNAME=john123
VITE_AIO_KEY=aio_xxxxxxxxxxxxxxxxxxxxx
```

Restart the development server after updating the `.env` file.

---

# 📡 ESP8266 Setup

This project is compatible with:

- ESP8266 NodeMCU
- ESP32 (with minor modifications)

---

## Arduino Libraries

Install the following libraries from Arduino IDE:

- Adafruit MQTT Library
- Adafruit IO Arduino
- ESP8266WiFi
- ArduinoJson
- WiFiManager (Optional)

---

## Wi-Fi Configuration

Update your ESP8266 firmware with:

```cpp
const char* WIFI_SSID = "YOUR_WIFI_NAME";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
```

---

## Adafruit Credentials

Update:

```cpp
#define AIO_USERNAME "YOUR_USERNAME"
#define AIO_KEY "YOUR_ACTIVE_KEY"
```

---

## Feed Name

Example:

```cpp
Adafruit_MQTT_Subscribe ledFeed =
Adafruit_MQTT_Subscribe(
    &mqtt,
    AIO_USERNAME "/feeds/smartled-setup6"
);
```

Replace the feed name according to your device.

---

# 🔄 Data Format

The dashboard sends brightness commands in the following format:

```
Power,Brightness
```

Examples:

| Command | Description |
|----------|-------------|
| `0,0` | LED OFF |
| `1,51` | 20% Brightness |
| `1,102` | 40% Brightness |
| `1,153` | 60% Brightness |
| `1,204` | 80% Brightness |
| `1,255` | 100% Brightness |

---

# 🚀 Build for Production

Create the production build:

```bash
npm run build
```

Output:

```
dist/
```

---

# 🌍 Deployment

The project is deployed using **Render Static Site**.

### Build Command

```bash
npm install && npm run build
```

### Publish Directory

```
dist
```

---

# 📱 Mobile Testing

To test on your mobile device:

Start Vite with:

```bash
npm run dev -- --host
```

Find your network IP:

```bash
ipconfig
```

Open on your mobile:

```
http://YOUR_LOCAL_IP:5173
```

For production testing, use the deployed HTTPS URL.

---

# 🤖 MediaPipe AI Model

This project uses Google's MediaPipe Hand Landmarker model.

Model:

```
hand_landmarker.task
```

Loaded dynamically from:

```
https://storage.googleapis.com/mediapipe-models/
```

No manual download is required.

---

# 📂 Configuration Files

Main configuration files used in this project:

```
package.json
vite.config.js
.env
.gitignore
```

---

# 🛠 Development Commands

### Install packages

```bash
npm install
```

### Start development

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Check code quality

```bash
npm run lint
```

---

# ✅ Installation Checklist

Before running the project, ensure that:

- React dependencies are installed
- Node.js is installed
- Adafruit IO account is created
- Username and Active Key are configured
- Required feeds are created
- ESP8266 firmware is configured
- `.env` file is created
- Internet connection is available
- Camera permission is allowed
- Microphone permission is allowed

- ---

# 🖥 Dashboard Guide

The Smart LED Dashboard provides a centralized interface to monitor and control one or multiple Smart LED devices.

Users can perform the following operations directly from the dashboard:

- Discover online devices
- Manage saved devices
- Control LED brightness
- Control LED using voice
- Control LED using hand gestures
- Monitor online/offline status
- Reset devices
- Broadcast commands to all devices

---

## 🏠 Dashboard Layout

```
+------------------------------------------------------+
|                    Smart LED Dashboard               |
+------------------------------------------------------+

 Device Manager

 Selected Device
 Device Status

 ---------------------------------------------
 Camera
 Hand Tracker
 Voice Control
 Brightness Control
 ---------------------------------------------

 Finger Count
 Brightness %
 Gesture Status

 ---------------------------------------------
 Manual Controls
 Fleet Broadcast
 Reset Device
 ---------------------------------------------
```

---

# 🤖 AI Hand Gesture Control

The dashboard uses **Google MediaPipe Tasks Vision** to detect the user's hand in real time.

The complete workflow is shown below.

```
Camera
    │
    ▼
Video Stream
    │
    ▼
MediaPipe Hand Landmarker
    │
    ▼
21 Hand Landmarks
    │
    ▼
Finger Counter
    │
    ▼
Brightness Calculation
    │
    ▼
Adafruit IO REST API
    │
    ▼
ESP8266 NodeMCU
    │
    ▼
LED Brightness
```

---

## ✋ Hand Tracking

MediaPipe detects:

- Palm
- Thumb
- Index Finger
- Middle Finger
- Ring Finger
- Pinky Finger

A total of **21 landmarks** are detected for each hand.

Example:

```
        ●
      ● ●
     ●   ●
    ●     ●
   ●       ●
```

The detected landmarks are drawn live on top of the camera preview.

---

## 👆 Finger Counting

Each frame is analyzed to determine the number of extended fingers.

Current mapping:

| Fingers | Brightness |
|----------|------------|
| 0 | 0% |
| 1 | 0% *(temporary stability fix)* |
| 2 | 40% |
| 3 | 60% |
| 4 | 80% |
| 5 | 100% |

The dashboard continuously updates the detected finger count and corresponding brightness value.

---

## 💡 Brightness Mapping

Brightness is converted into PWM values before being sent to the ESP8266.

Formula:

```
PWM = (Brightness / 100) × 255
```

Examples:

| Brightness | PWM |
|-------------|-----|
| 0% | 0 |
| 40% | 102 |
| 60% | 153 |
| 80% | 204 |
| 100% | 255 |

The dashboard sends commands in the following format:

```
Power,PWM
```

Example:

```
1,255
```

Meaning:

- LED ON
- PWM = 255

---

# 🎤 Voice Control

The dashboard supports browser-based speech recognition using the **Web Speech API**.

Workflow:

```
Microphone
      │
      ▼
Speech Recognition
      │
      ▼
Text Command
      │
      ▼
Command Parser
      │
      ▼
Adafruit REST API
      │
      ▼
ESP8266
      │
      ▼
LED
```

---

## Supported Voice Commands

Examples:

```
Turn on light

Turn off light

Brightness 100

Brightness 50
```

The command parser converts natural language into LED control commands.

---

## Voice Recognition States

The dashboard displays the current recognition state:

- Listening
- Speech Detected
- Processing
- Recognition Complete

---

# 📷 Camera System

The dashboard supports:

- Front Camera
- Rear Camera
- Camera Flip
- Mobile Browsers
- Desktop Browsers

Camera access requires browser permission.

---

# 📡 Device Discovery

The dashboard automatically discovers online ESP8266 devices.

Workflow:

```
ESP8266
    │
Heartbeat
    │
    ▼
Adafruit Feed
    │
    ▼
Dashboard
    │
    ▼
Device List
```

Each online device periodically sends heartbeat messages.

The dashboard monitors these messages to determine whether a device is online or offline.

---

## Device Information

Each discovered device contains:

- Feed Name
- Display Name
- Online Status
- Last Seen Time

---

## Device Manager

The Device Manager allows users to:

- Add Device
- Save Device
- Select Device
- Remove Device

The selected device becomes the active target for:

- Voice Control
- Gesture Control
- Brightness Control

---

# 🌐 API Communication

All communication occurs through the **Adafruit IO REST API**.

```
React Dashboard
        │
HTTP POST
        │
        ▼
Adafruit IO
        │
        ▼
ESP8266
```

---

## Sending Brightness

Example request:

```
POST

https://io.adafruit.com/api/v2/{USERNAME}/feeds/{DEVICE}/data
```

Body:

```json
{
  "value": "1,204"
}
```

Meaning:

```
LED ON

PWM = 204
```

---

## Turn LED OFF

```json
{
  "value": "0,0"
}
```

---

## Reset Device

```json
{
  "value": "RESET"
}
```

---

## Fleet Broadcast

The dashboard can broadcast commands to every online Smart LED device.

Workflow:

```
Dashboard
      │
      ▼
smartled-all Feed
      │
      ▼
All ESP8266 Devices
```

Useful for:

- Emergency Shutdown
- Global Brightness
- Fleet Updates

---

# 🔄 Complete System Flow

```
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Voice         Hand Gesture
 │               │
 └──────┬────────┘
        ▼
Command Processing
        │
        ▼
Brightness Calculation
        │
        ▼
REST API
        │
        ▼
Adafruit IO
        │
        ▼
ESP8266
        │
        ▼
LED
```

---

# ⚡ Performance Optimizations

The dashboard includes several optimizations:

- Real-time hand tracking
- Camera stream reuse
- Stable gesture detection
- Reduced duplicate API requests
- Brightness update optimization
- Mobile browser support
- Responsive UI
- Live device monitoring

---

# 📱 Mobile Compatibility

The dashboard is optimized for:

- Android Chrome
- Desktop Chrome
- Mobile Camera
- Touch Controls
- Voice Recognition
- Responsive Layout

---

# 🔒 Browser Permissions

The application requires:

- Camera Permission
- Microphone Permission
- Internet Connection

Without these permissions, gesture and voice control will not function correctly.

---

# 🚀 Deployment

The Smart LED Dashboard can be deployed on any static hosting platform that supports React applications.

## Supported Platforms

- Render
- Vercel
- Netlify
- GitHub Pages (with configuration)

This project is currently deployed using **Render Static Site**.

---

## Render Deployment

### Build Command

```bash
npm install && npm run build
```

### Publish Directory

```text
dist
```

---

## Environment Variables

Configure the following variables in your deployment platform.

```env
VITE_AIO_USERNAME=YOUR_ADAFRUIT_USERNAME
VITE_AIO_KEY=YOUR_ADAFRUIT_ACTIVE_KEY
```

---

## React Router Configuration

Since this project uses React Router, configure a rewrite rule to prevent **404 Not Found** errors when refreshing pages.

### Render Rewrite Rule

| Source | Destination | Action |
|---------|-------------|--------|
| `/*` | `/index.html` | Rewrite |

---

# 🧪 Testing Checklist

Before deploying, verify the following:

## Dashboard

- Dashboard loads successfully
- Navigation works correctly
- No console errors

---

## Camera

- Camera opens successfully
- Camera permission granted
- Front camera works
- Rear camera works
- Flip Camera works

---

## Gesture Control

- Hand detected
- Finger counting works
- Brightness changes correctly
- LED responds correctly

---

## Voice Control

- Microphone permission granted
- Voice recognition starts
- Commands recognized correctly
- LED responds correctly

---

## Device Discovery

- Device appears online
- Device selection works
- Heartbeat updates correctly

---

## ESP8266 Communication

- Device connects to Wi-Fi
- Device connects to Adafruit IO
- Receives commands
- Updates LED brightness

---

# 🛠 Troubleshooting

## Camera Not Opening

### Possible Causes

- Camera permission denied
- Browser does not support camera
- Camera already in use
- HTTP instead of HTTPS

### Solution

- Allow camera permission
- Use HTTPS deployment
- Close other camera applications
- Refresh the page

---

## Voice Control Not Working

### Possible Causes

- Microphone permission denied
- Browser does not support Speech Recognition
- No internet connection

### Solution

- Allow microphone permission
- Use Google Chrome
- Refresh the page

---

## Device Offline

### Possible Causes

- ESP8266 not powered
- Wi-Fi disconnected
- Adafruit IO connection lost

### Solution

- Restart ESP8266
- Check Wi-Fi credentials
- Verify Adafruit IO credentials

---

## LED Not Responding

### Possible Causes

- Wrong feed name
- Invalid API key
- Device offline
- Incorrect wiring

### Solution

- Verify feed name
- Check API key
- Confirm device is online
- Verify hardware connections

---

## Refresh Shows "Not Found"

### Cause

React Router requires URL rewriting in production.

### Solution

Configure the hosting platform to rewrite all routes to:

```text
/index.html
```

---

# 📈 Performance Tips

For the best experience:

- Use HTTPS
- Use Google Chrome
- Keep a stable internet connection
- Ensure good lighting for gesture detection
- Keep your hand 30–60 cm from the camera
- Avoid blocking the camera view

---

# 🔒 Security Notes

- Never commit your Adafruit IO Active Key to GitHub.
- Store secrets in a `.env` file.
- Add `.env` to `.gitignore`.
- Use HTTPS in production.
- Restrict access to your Adafruit IO account.

---

# 🗺 Roadmap

## Version 1.0 ✅

- Device Discovery
- Device Manager
- Voice Control
- Gesture Control
- Brightness Control
- Camera Flip
- MediaPipe Integration
- Mobile Support

---

## Planned Improvements

- Advanced gesture recognition
- Gesture smoothing
- Custom device names
- Device groups
- User authentication
- Device scheduling
- Brightness animations
- OTA firmware updates
- Theme customization
- Dashboard analytics
- MQTT integration
- Multi-user support
- Notification system

---

# 🤝 Contributing

Contributions are welcome.

If you find a bug or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please ensure your code follows the existing project structure and coding style.

---

# 🙏 Acknowledgements

This project uses the following technologies and open-source tools:

- React
- Vite
- MediaPipe
- Adafruit IO
- ESP8266 Arduino Core
- Web Speech API
- Render
- GitHub

Special thanks to the open-source community for the libraries and tools that made this project possible.

---

# 📄 License

This repository is shared for educational and demonstration purposes.

Please respect the original project's ownership and any licensing terms established by **RoboManthan Pvt. Ltd.**

If you plan to reuse or redistribute this project, obtain permission from the project owner where required.

---

# 👨‍💻 Project Information

**Project Name**

Smart LED Dashboard

**Organization**

RoboManthan Pvt. Ltd.

**Project Type**

AI + IoT Smart LED Control Dashboard

**Technologies**

React • Vite • MediaPipe • ESP8266 • Adafruit IO • REST API • JavaScript

---

# 👤 Contributor

**Birbal Kumar**

---

# 🌐 Connect with Me

<p align="center">

<a href="https://www.linkedin.com/in/birbalkumar-sf32/" target="_blank">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://github.com/Birbal5040" target="_blank">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="mailto:dcebky@gmail.com">
<img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

</p>

---
AI & Robotics Intern

Contributed to:

- React Dashboard Development
- MediaPipe Hand Tracking Integration
- Gesture-Based Brightness Control
- Voice Control Features
- Device Discovery & Management
- Frontend Development
- Testing and Bug Fixes

---

<div align="center">

### ⭐ If you found this project useful, consider giving the repository a star.

**Built with ❤️ using React, MediaPipe, ESP8266, and Adafruit IO**

</div>
