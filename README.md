# 🏃‍♂️ Strides Over Stigma

**A Next.js web application dedicated to promoting mental health awareness through community running events and storytelling.**  

> This project features beautiful animations, a robust registration system, and a modern, accessible design.

---

## 🌟 Features

- ⚡ **Next.js 14** (App Router) & **React 18**
- 💨 **Tailwind CSS** for utility-first styling
- 🧱 **shadcn/ui** for accessible, reusable UI components
- 🎥 **Framer Motion** for smooth, declarative animations
- 📋 **Event registration form** with validation and Firebase integration
- 📊 **Admin dashboard** with analytics (charts, stats, and management)
- 📍 **Embedded Google Maps** for event locations
- 👥 **About Us** and **Team** sections
- 💬 **Real runner stories** and story submission CTA
- 📧 Responsive navbar with contact/social links
- 🧾 Custom, animated footer

---

## 🛠️ Tech Stack

| Tech              | Description                            |
| ----------------- | -------------------------------------- |
| **Next.js**       | App framework for React (App Router)   |
| **Tailwind CSS**  | Utility-first CSS framework            |
| **shadcn/ui**     | Accessible, reusable UI components     |
| **Framer Motion** | Declarative animations and transitions |
| **Firebase**      | Backend for saving registration data   |
| **Chart.js**      | Analytics and data visualization       |

---

## 🧪 Registration Form

- ✅ Validates required fields (name, email, shirt size, event)
- ❗ Prevents submission without agreement to terms
- 📤 Submits data to Firebase with `eventFee`, `status`, and `paymentStatus`
- 🟢 Success message fades after 5 seconds
- 🔴 Error handling for permission/network issues

---

## 🛡️ Admin Dashboard

- 🔒 Password-protected admin login
- 📋 View, refresh, and delete registrations
- 📊 Analytics: shirt size distribution, event counts, payment status, registration timeline
- 🗑️ Delete individual registrations with confirmation and loading state
- 📈 Built with Chart.js (Pie & Bar charts)
- 🏷️ Summary stats and quick refresh

---

## 📂 Folder Structure

```bash
.
├── src/
│   ├── app/
│   │   ├── [page.tsx](http://_vscodecontentref_/0)         # Main landing page (all sections)
│   │   ├── [page.tsx](http://_vscodecontentref_/1)   # Admin dashboard
│   │   ├── [layout.tsx](http://_vscodecontentref_/2)       # Root layout and metadata
│   │   └── [globals.css](http://_vscodecontentref_/3)      # Global and Tailwind styles
│   ├── lib/
│   │   └── [utils.ts](http://_vscodecontentref_/4)         # Utility functions (e.g., class merging)
│   └── utils/
│       └── registration.ts  # Firebase registration logic
├── public/                  # Static assets (images, favicon, etc.)
├── .env.local               # Firebase config (not committed)
├── [tailwind.config.js](http://_vscodecontentref_/5)       # Tailwind CSS config
└── [README.md](http://_vscodecontentref_/6)
```

---

## 🖼️ Page Sections

### Main Landing Page (`/`)
* 🎯 **Hero Section** – Animated title with call-to-action buttons
* 💬 **Mission Section** – Our four-pillar purpose and organizational values
* 📍 **Events Section** – Interactive Google Maps embed with event locations
* 📝 **Registration Form** – Complete event signup with validation and Firebase integration
* 📖 **Stories Section** – Real runner stories and community impact narratives
* 👥 **About Us** – Organization story, mission, and team member profiles
* 🧾 **Footer** – Contact information, social links, and copyright

### Admin Dashboard (`/admin`)
* 🔐 **Login Interface** – Secure password authentication
* 📊 **Analytics Overview** – Registration statistics and data visualization
* 📋 **Registration Management** – View, filter, and manage participant data
* 🗑️ **Data Controls** – Delete registrations with confirmation dialogs
* 📈 **Charts & Insights** – Pie and bar charts for registration analytics

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 📊 Data Schema

### Registration Document Structure
```typescript
interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  event: string;
  eventFee: number;
  shirtSize: string;
  status: 'pending' | 'confirmed';
  paymentStatus: 'pending' | 'paid' | 'unpaid';
  agreeToTerms: boolean;
  registeredAt: Timestamp;
}
```

---

## 🎯 Event Information

* **Event Type**: 5K Run/Walk for Mental Health Awareness
* **Projected Date**: September 6, 2025
* **Location**: Reno, Nevada
* **Registration**: Online via integrated form
* **Management**: Real-time admin dashboard

---

## 👥 Team

* **Rushil Mahadevu** - Co-Founder & Chief Technology Officer (CTO)
* **Rhys Ferrito** - Co-Founder & Chief Marketing Officer (CMO)

---

## 📫 Contact

📧 [stridesoverstigma@gmail.com](mailto:stridesoverstigma@gmail.com)  
📸 [Instagram @strides.over.stigma](https://instagram.com/strides.over.stigma)  
💻 [GitHub Repository](https://github.com/yourusername/strides-over-stigma)

---

## 🏃‍♀️ Mission Statement

Strides Over Stigma is a Reno-based running organization dedicated to promoting mental health awareness through community engagement, physical activity, and breaking down stigmas through open dialogue and shared experiences.

---

## © License

**All Rights Reserved © 2025 Strides Over Stigma**

This project is provided for **viewing and educational purposes only**. 

**Permitted:**
- ✅ View source code for learning
- ✅ Reference implementation patterns
- ✅ Use as portfolio demonstration

**Prohibited:**
- ❌ Copy, modify, or redistribute any code
- ❌ Use for commercial purposes
- ❌ Fork or create derivative works
- ❌ Remove copyright notices

For licensing inquiries or permission requests, contact: [stridesoverstigma@gmail.com](mailto:stridesoverstigma@gmail.com)

---