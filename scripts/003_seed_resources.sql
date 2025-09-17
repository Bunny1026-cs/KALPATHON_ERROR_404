-- Insert sample wellbeing resources
INSERT INTO public.resources (title, description, category, content_type, content, difficulty_level, estimated_time) VALUES
-- Mindfulness resources
('5-Minute Breathing Exercise', 'A simple breathing technique to reduce stress and anxiety', 'mindfulness', 'exercise', 'Sit comfortably and close your eyes. Breathe in for 4 counts, hold for 4 counts, breathe out for 6 counts. Repeat for 5 minutes.', 'beginner', 5),
('Body Scan Meditation', 'Progressive relaxation technique for stress relief', 'mindfulness', 'exercise', 'Lie down comfortably. Starting from your toes, slowly focus on each part of your body, noticing any tension and consciously relaxing each area.', 'beginner', 15),
('Mindful Walking', 'Walking meditation for anxiety and stress', 'mindfulness', 'exercise', 'Walk slowly and deliberately, focusing on each step, the feeling of your feet touching the ground, and your breathing rhythm.', 'beginner', 10),

-- Exercise resources
('Quick Desk Stretches', 'Simple stretches to do between study sessions', 'exercise', 'exercise', '1. Neck rolls 2. Shoulder shrugs 3. Wrist circles 4. Seated spinal twist 5. Ankle rolls. Hold each for 30 seconds.', 'beginner', 5),
('15-Minute Energy Boost Workout', 'High-energy workout to combat fatigue', 'exercise', 'exercise', '3 rounds of: 10 jumping jacks, 10 push-ups, 10 squats, 30-second plank, 1-minute rest between rounds.', 'intermediate', 15),

-- Study tips
('Pomodoro Technique', 'Time management method for better focus', 'study_tips', 'tool', 'Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.', 'beginner', 25),
('Active Recall Method', 'Effective studying technique for better retention', 'study_tips', 'tool', 'Instead of re-reading notes, test yourself by writing down everything you remember about a topic, then check your accuracy.', 'intermediate', 30),

-- Sleep resources
('Sleep Hygiene Checklist', 'Essential habits for better sleep quality', 'sleep', 'article', 'Keep consistent sleep schedule, avoid screens 1 hour before bed, keep room cool and dark, avoid caffeine after 2 PM, create a relaxing bedtime routine.', 'beginner', 10),
('Progressive Muscle Relaxation for Sleep', 'Technique to help fall asleep faster', 'sleep', 'exercise', 'Tense and then relax each muscle group starting from your toes and working up to your head. Hold tension for 5 seconds, then release.', 'beginner', 20),

-- Nutrition
('Brain-Boosting Snacks', 'Healthy snacks to improve focus and energy', 'nutrition', 'article', 'Nuts and seeds, berries, dark chocolate, Greek yogurt with berries, apple slices with almond butter, green tea.', 'beginner', 5),

-- Social resources
('Building Study Groups', 'How to create effective peer support networks', 'social', 'article', 'Find classmates with similar goals, set regular meeting times, assign roles, create shared resources, maintain accountability.', 'beginner', 15);
