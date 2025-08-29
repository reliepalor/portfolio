# Next.js 14 Developer Portfolio Template

A modern, responsive, and SEO-optimized **Next.js 14 portfolio template** designed for developers, designers, and professionals. This open-source project helps you showcase your skills, experience, and projects with an elegant interface that stands out. Built with server-side rendering, TypeScript, and the latest web standards for optimal performance.

## ✨ Key Features

- **Professional Experience Timeline**: Showcase your career journey with a visually appealing timeline
- **Project Showcase**: Display your technical projects with detailed information and live demos
- **Dark/Light Mode**: Professional appearance with theme support
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **100% Performance Score**: Fully optimized for speed and Core Web Vitals
- **SEO-Ready**: Structured data, meta tags, and optimized content
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui
- **Easy Customization**: Well-organized code structure with minimal effort required
- **Animations**: Subtle animations for engaging user experience
- **Analytics Integration**: Ready for Google Analytics tracking
- **Contact Form**: Functional contact form with validation
- **Open Source**: Free to use and modify for your personal portfolio

## 🚀 Demo

View the live demo at [{siteConfig.url}]({siteConfig.url})

https://github.com/namanbarkiya/minimal-next-portfolio/assets/82203888/f93bf5ca-c2bd-4fe5-a413-1050ebf6cf78

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: Server actions with validation
- **Analytics**: Google Analytics + Vercel Analytics
- **Deployment**: [Vercel](https://vercel.com)

## 🔧 Getting Started

To get started with your own portfolio website:

1. Clone this repository:

   ```bash
   git clone https://github.com/namanbarkiya/minimal-next-portfolio.git my-portfolio
   cd my-portfolio
   ```

2. Copy the contents of `.env.copy` to a new `.env.local` file and fill in the required information.

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser to see the website.

## 📊 Google Analytics Setup

To enable Google Analytics tracking:

### 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Find your Measurement ID (starts with `G-`)

### 2. Local Development Setup

Add the following to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID_HERE
```

Replace `G-YOUR_MEASUREMENT_ID_HERE` with your actual Measurement ID.

### 3. Vercel Deployment Setup

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: Your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)
   - **Environment**: Production (and Preview if desired)

4. Redeploy your application for the changes to take effect

### 4. Verify Setup

- Google Analytics will only load when `NEXT_PUBLIC_GA_ID` is set
- Check your Google Analytics dashboard to see real-time data
- The analytics code is automatically included in production builds

## 🎨 Customization

The portfolio is designed to be easily customizable:

1. **Personal Information**: Update your personal info in `config/site.ts`
2. **Skills**: Add your skills in `config/skills.ts`
3. **Projects**: Add your technical projects in `config/projects.ts`
4. **Experience**: Customize your professional experience in `config/experience.ts`
5. **Contributions**: Showcase your contributions in `config/contributions.ts`
6. **Colors & Theme**: Modify the theme in `tailwind.config.js`

## 🌟 Features In Detail

### Professional Experience Timeline

An interactive, animated timeline that showcases your career journey with expandable sections for details about each position and company.

### Project Showcase

Display your technical projects with detailed information, technologies used, live demo links, and comprehensive project descriptions.

### Skills Showcase

Visually represent your technical and soft skills with customizable ratings and categories.

### Contact Form Integration

A ready-to-use contact form that can connect to various backend services.

### SEO Optimization

Built-in SEO features with proper meta tags, structured data, and semantic HTML.

## 📱 Performance and Responsiveness

![best-portfolio-website-score](https://github.com/namanbarkiya/minimal-next-portfolio/assets/82203888/3fb9c94d-9d99-4e98-92ea-14aadc91b568)
![100-score-vercel](https://github.com/namanbarkiya/minimal-next-portfolio/assets/82203888/7cfe28cc-b619-4199-9dab-1cf16723b86d)

This template is optimized for:

- 100% Lighthouse score
- Excellent Core Web Vitals metrics
- Responsive design across all device sizes
- Fast loading times with proper image optimization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Design inspired by modern portfolio best practices
- Built by [{siteConfig.authorName}]({siteConfig.links.github})
- Icons from [Lucide](https://lucide.dev/)

## 💻 Deploy on Vercel

The easiest way to deploy your portfolio is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=namanbarkiya/minimal-next-portfolio&type=Date)](https://star-history.com/#namanbarkiya/minimal-next-portfolio&Date)

---

**Built with ❤️ by [{siteConfig.authorName}]({siteConfig.links.github})**
