# Mental Health Companion App

A comprehensive mental health support application built with Next.js and Supabase, featuring AI-powered companionship, mental health assessments, crisis support, and curated resources.

## 🌟 Features

- **AI Companion Chat**: Interactive conversations with Luna, an empathetic AI mental health companion powered by OpenAI GPT-4
- **Mental Health Assessment**: Comprehensive questionnaires to evaluate mental well-being
- **Crisis Support**: Immediate access to crisis resources and emergency contacts
- **Resource Library**: Curated collection of mental health articles, videos, and tools
- **Progress Dashboard**: Track your mental health journey and assessment history
- **Responsive Design**: Optimized for desktop and mobile devices
- **No Authentication Required**: Open access for immediate support

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4 with Vercel AI SDK
- **Deployment**: Vercel
- **Real-time Chat**: Streaming AI responses with natural conversation flow

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project
- OpenAI API key (for AI companion functionality)

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/mental-health-companion-app.git
   cd mental-health-companion-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # OpenAI Configuration (for AI companion)
   OPENAI_API_KEY=your_openai_api_key
   \`\`\`

4. **Set up the database**
   Run the SQL scripts in order in your Supabase SQL editor:
   \`\`\`sql
   -- 1. Execute scripts/001_create_database_schema.sql
   -- 2. Execute scripts/002_create_profile_trigger.sql  
   -- 3. Execute scripts/003_seed_resources.sql
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤖 AI Companion Features

Luna, the AI companion, provides:
- **Empathetic Conversations**: Natural, supportive dialogue
- **Active Listening**: Validates feelings and experiences
- **Coping Strategies**: Gentle guidance and mental health tips
- **Crisis Awareness**: Recognizes when to suggest professional help
- **Safe Space**: Non-judgmental environment for sharing

## 📊 Database Schema

The application uses the following main tables:

- **profiles**: User profile information
- **assessments**: Mental health assessment results with risk levels
- **ai_companions**: AI companion configurations and assignments
- **conversations**: Chat messages between users and companions
- **resources**: Mental health resources and articles
- **user_resource_interactions**: User engagement tracking

## 🎨 Key Pages

- `/` - Landing page with app overview and features
- `/dashboard` - Main user dashboard with quick access
- `/assessment` - Mental health assessment questionnaire
- `/companion` - AI companion chat interface with Luna
- `/companion-assignment` - Companion selection and setup
- `/resources` - Mental health resource library
- `/crisis` - Crisis support and emergency resources
- `/help` - Help and support information

## 🔧 API Endpoints

- `POST /api/chat` - AI companion chat streaming endpoint
- Database operations handled through Supabase client-side SDK

## 🚀 Deployment

The app is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Privacy & Security

- No personal data stored without consent
- All conversations are processed securely
- Crisis detection built into AI responses
- Encourages professional help when appropriate

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Crisis Resources

If you're experiencing a mental health crisis:

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

For app support:
- Open an issue on GitHub
- Check the `/help` page in the application

## 🙏 Acknowledgments

- Built with modern web technologies for accessibility and performance
- Designed with mental health best practices in mind
- AI responses crafted to be supportive and non-diagnostic
