
import { createClient } from '@supabase/supabase-js';
import { UserProfile, AnalyticsEvent, LearningStyleType, FeedbackSubmission, VARKScores, QuizResult } from "../types";

const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn("Supabase credentials missing. Database sync will be disabled.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const USER_KEY = 'rim_user_profile';
const SESSION_SEQ_KEY = 'rim_event_sequence';

class DatabaseService {
  private user: UserProfile | null = null;
  private lastEventTime: number = Date.now();
  private eventSequence: number = 0;

  constructor() {
    this.loadUser();
    this.eventSequence = parseInt(sessionStorage.getItem(SESSION_SEQ_KEY) || '0');
  }

  private loadUser() {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      this.user = JSON.parse(stored);
    }
  }

  public getUser(): UserProfile | null {
    return this.user;
  }

  public async saveUser(profile: UserProfile) {
    this.user = profile;
    localStorage.setItem(USER_KEY, JSON.stringify(profile));

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        age: profile.age,
        education: profile.education,
        university: profile.university,
        field_of_study: profile.fieldOfStudy,
        country: profile.country,
        session_count: profile.sessionCount,
        learning_style: profile.learningStyle || 'Unknown',
        vark_scores: profile.learningScores
      });

    console.log("PROFILE DATA:", data);
    console.log("PROFILE ERROR:", error);

    if (error) console.error("Supabase Profile Sync Error:", error);
  }

  public async saveQuizResult(result: QuizResult) {
    if (!this.user) return;
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: result.userId,
        score: result.score,
        total_questions: result.totalQuestions,
        accuracy_percent: (result.score / result.totalQuestions) * 100
      });
    
    console.log("QUIZ DATA:", data);
    console.log("QUIZ ERROR:", error);

    if (error) console.error("Supabase Quiz Log Error:", error);
  }

  public async logEvent(event: Omit<AnalyticsEvent, 'userId' | 'timestamp' | 'interEventTime' | 'sequenceIndex'>) {
    if (!this.user) return;
    const now = Date.now();
    const interTime = (now - this.lastEventTime) / 1000;
    this.eventSequence++;
    sessionStorage.setItem(SESSION_SEQ_KEY, this.eventSequence.toString());

    const { data, error } = await supabase
      .from('events')
      .insert({
        user_id: this.user.id,
        event_type: event.eventType,
        target: event.target,
        value: event.value,
        inter_event_time: interTime,
        sequence_index: this.eventSequence,
        metadata: event.metadata,
        timestamp: new Date(now).toISOString()
      });
    
    console.log("EVENT DATA:", data);
    console.log("EVENT ERROR:", error);

    this.lastEventTime = now;
    if (error) console.error("Supabase Event Log Error:", error);
  }

  public async saveFeedback(data: FeedbackSubmission) {
    if (!this.user) return;
    
    // Flatten the ratings and openEnded into a single object for Supabase columns
    const feedbackData: any = {
      user_id: data.userId,
      ...data.ratings,
      ...data.openEnded
    };

    const { error } = await supabase
      .from('feedback')
      .insert(feedbackData);
      
    if (error) console.error("Supabase Feedback Error:", error);
  }

  public async updateUserStyle(style: LearningStyleType, scores: VARKScores) {
    if (this.user) {
      this.user.learningStyle = style;
      this.user.learningScores = scores;
      await this.saveUser(this.user);
    }
  }

  public async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      if (error) throw error;
      return { success: true, message: "Successfully connected to Supabase." };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to connect to Supabase." };
    }
  }

  public logout() {
    this.user = null;
    localStorage.removeItem(USER_KEY);
  }
}

export const db = new DatabaseService();
