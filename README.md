# 🏃‍♂️ Strides Over Stigma

**A Next.js web application built to promote mental health awareness through community and physical activity.**
This app combines beautiful animations, responsive design, and an accessible registration form.

---

## 🌟 Features

* ⚡ Built with **Next.js 14** and **React 18**
* 💨 Styled using **Tailwind CSS**
* 🧱 UI components powered by **shadcn/ui**
* 🎥 Smooth animations via **Framer Motion**
* 📋 Fully functional **event registration form** with validation
* 📍 Embedded Google Maps for event locations
* 📧 Contact and social links with responsive navbar
* 🧠 Mission, About Us, and Team sections
* 🗃️ Firebase integration for form submission

---

## 🛠️ Tech Stack

| Tech              | Description                            |
| ----------------- | -------------------------------------- |
| **Next.js**       | App framework for React                |
| **Tailwind CSS**  | Utility-first CSS framework            |
| **shadcn/ui**     | Accessible, reusable UI components     |
| **Framer Motion** | Declarative animations and transitions |
| **Firebase**      | Backend for saving registration data   |

---

## 🧪 Form Behavior

* ✅ Validates required fields (name, email, shirt size, event)
* ❗ Prevents submission without agreement to terms
* 📤 Submits data to Firebase with `eventFee`, `status`, and `paymentStatus` fields
* 🟢 Success message fades after 5 seconds
* 🔴 Error handling includes permission/network-specific messages

---

## 📂 Folder Structure Highlights

```bash
.
├── components/         # Reusable components (optional)
├── pages/
│   └── index.tsx       # Main landing and registration page
├── utils/
│   └── registration.ts # Firebase saving logic
├── public/             # Static assets
├── styles/             # Tailwind or global styles
└── .env.local          # Firebase config (not committed)
```

---

## 🖼️ Page Sections

* 🎯 **Hero** – Title and navigation to mission/events
* 💬 **Mission** – Our four-pillar purpose
* 📍 **Events** – Embedded Google Map
* 📝 **Registration** – Fully styled and validated form
* 👥 **About Us** – Story + founders
* 🧾 **Footer** – Copyright

---

## 📫 Contact

📧 [stridesoverstigma@gmail.com](mailto:stridesoverstigma@gmail.com)
📸 [Instagram](https://instagram.com/strides.over.stigma)

---

## © License

MIT © 2025 Strides Over Stigma

---