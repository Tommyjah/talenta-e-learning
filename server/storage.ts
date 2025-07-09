import {
  users,
  courses,
  enrollments,
  certificates,
  reviews,
  universities,
  financialAid,
  newsletter,
  payments,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Certificate,
  type Review,
  type InsertReview,
  type University,
  type FinancialAid,
  type InsertFinancialAid,
  type Newsletter,
  type InsertNewsletter,
  type Payment,
  type InsertPayment,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, ilike, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Course operations
  getCourses(search?: string, category?: string, featured?: boolean): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourseStats(courseId: number, enrollmentCount: number, rating: string): Promise<void>;
  
  // Enrollment operations
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]>;
  getEnrollment(userId: string, courseId: number): Promise<Enrollment | undefined>;
  updateEnrollmentProgress(userId: string, courseId: number, progress: string, completedModules: any[]): Promise<void>;
  
  // Certificate operations
  createCertificate(userId: string, courseId: number, certificateUrl: string): Promise<Certificate>;
  getUserCertificates(userId: string): Promise<(Certificate & { course: Course })[]>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getCourseReviews(courseId: number): Promise<(Review & { user: User })[]>;
  
  // University operations
  getUniversities(): Promise<University[]>;
  
  // Financial Aid operations
  createFinancialAid(aid: InsertFinancialAid): Promise<FinancialAid>;
  getUserFinancialAid(userId: string): Promise<FinancialAid[]>;
  
  // Newsletter operations
  subscribeNewsletter(email: string): Promise<Newsletter>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: number, status: string, stripePaymentId?: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Course operations
  async getCourses(search?: string, category?: string, featured?: boolean): Promise<Course[]> {
    let query = db.select().from(courses);
    
    const conditions = [];
    if (search) {
      conditions.push(ilike(courses.title, `%${search}%`));
    }
    if (category) {
      conditions.push(eq(courses.category, category));
    }
    if (featured) {
      conditions.push(eq(courses.isFeatured, true));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return query.orderBy(desc(courses.enrollmentCount));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async updateCourseStats(courseId: number, enrollmentCount: number, rating: string): Promise<void> {
    await db
      .update(courses)
      .set({ enrollmentCount, rating })
      .where(eq(courses.id, courseId));
  }

  // Enrollment operations
  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();
    return newEnrollment;
  }

  async getUserEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]> {
    const result = await db
      .select({
        id: enrollments.id,
        userId: enrollments.userId,
        courseId: enrollments.courseId,
        progress: enrollments.progress,
        completedModules: enrollments.completedModules,
        enrolledAt: enrollments.enrolledAt,
        completedAt: enrollments.completedAt,
        course: {
          id: courses.id,
          title: courses.title,
          description: courses.description,
          brief: courses.brief,
          category: courses.category,
          duration: courses.duration,
          price: courses.price,
          priceEtb: courses.priceEtb,
          imageUrl: courses.imageUrl,
          rating: courses.rating,
          enrollmentCount: courses.enrollmentCount,
          isFeatured: courses.isFeatured,
          modules: courses.modules,
          createdAt: courses.createdAt,
          updatedAt: courses.updatedAt,
        }
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));
    
    return result;
  }

  async getEnrollment(userId: string, courseId: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment;
  }

  async updateEnrollmentProgress(userId: string, courseId: number, progress: string, completedModules: any[]): Promise<void> {
    await db
      .update(enrollments)
      .set({ 
        progress, 
        completedModules,
        completedAt: parseInt(progress) >= 100 ? new Date() : null
      })
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
  }

  // Certificate operations
  async createCertificate(userId: string, courseId: number, certificateUrl: string): Promise<Certificate> {
    const [certificate] = await db
      .insert(certificates)
      .values({ userId, courseId, certificateUrl })
      .returning();
    return certificate;
  }

  async getUserCertificates(userId: string): Promise<(Certificate & { course: Course })[]> {
    const result = await db
      .select({
        id: certificates.id,
        userId: certificates.userId,
        courseId: certificates.courseId,
        certificateUrl: certificates.certificateUrl,
        issuedAt: certificates.issuedAt,
        course: {
          id: courses.id,
          title: courses.title,
          description: courses.description,
          brief: courses.brief,
          category: courses.category,
          duration: courses.duration,
          price: courses.price,
          priceEtb: courses.priceEtb,
          imageUrl: courses.imageUrl,
          rating: courses.rating,
          enrollmentCount: courses.enrollmentCount,
          isFeatured: courses.isFeatured,
          modules: courses.modules,
          createdAt: courses.createdAt,
          updatedAt: courses.updatedAt,
        }
      })
      .from(certificates)
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.userId, userId))
      .orderBy(desc(certificates.issuedAt));
    
    return result;
  }

  // Review operations
  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async getCourseReviews(courseId: number): Promise<(Review & { user: User })[]> {
    const result = await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        courseId: reviews.courseId,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        user: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          stripeCustomerId: users.stripeCustomerId,
          stripeSubscriptionId: users.stripeSubscriptionId,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        }
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.courseId, courseId))
      .orderBy(desc(reviews.createdAt));
    
    return result;
  }

  // University operations
  async getUniversities(): Promise<University[]> {
    return db.select().from(universities).orderBy(asc(universities.name));
  }

  // Financial Aid operations
  async createFinancialAid(aid: InsertFinancialAid): Promise<FinancialAid> {
    const [newAid] = await db.insert(financialAid).values(aid).returning();
    return newAid;
  }

  async getUserFinancialAid(userId: string): Promise<FinancialAid[]> {
    return db
      .select()
      .from(financialAid)
      .where(eq(financialAid.userId, userId))
      .orderBy(desc(financialAid.appliedAt));
  }

  // Newsletter operations
  async subscribeNewsletter(email: string): Promise<Newsletter> {
    const [subscription] = await db
      .insert(newsletter)
      .values({ email })
      .onConflictDoNothing()
      .returning();
    return subscription;
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }

  async updatePaymentStatus(id: number, status: string, stripePaymentId?: string): Promise<void> {
    await db
      .update(payments)
      .set({ status, stripePaymentId })
      .where(eq(payments.id, id));
  }
}

export const storage = new DatabaseStorage();
