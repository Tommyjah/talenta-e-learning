import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  language: varchar("language").default("en"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  brief: text("brief").notNull(),
  category: varchar("category").notNull(),
  duration: varchar("duration").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  priceEtb: decimal("price_etb", { precision: 10, scale: 2 }).notNull(),
  imageUrl: varchar("image_url"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  enrollmentCount: integer("enrollment_count").default(0),
  isFeatured: boolean("is_featured").default(false),
  modules: jsonb("modules").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  progress: decimal("progress", { precision: 5, scale: 2 }).default("0"),
  completedModules: jsonb("completed_modules").default([]),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default("gen_random_uuid()"),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  certificateUrl: varchar("certificate_url"),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  imageUrl: varchar("image_url"),
  website: varchar("website"),
  country: varchar("country"),
  partneredAt: timestamp("partnered_at").defaultNow(),
});

export const financialAid = pgTable("financial_aid", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  reason: text("reason").notNull(),
  income: varchar("income"),
  status: varchar("status").default("pending"),
  appliedAt: timestamp("applied_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").notNull(),
  method: varchar("method").notNull(),
  status: varchar("status").default("pending"),
  stripePaymentId: varchar("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertFinancialAidSchema = createInsertSchema(financialAid).omit({
  id: true,
  appliedAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletter).omit({
  id: true,
  subscribedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type University = typeof universities.$inferSelect;
export type FinancialAid = typeof financialAid.$inferSelect;
export type InsertFinancialAid = z.infer<typeof insertFinancialAidSchema>;
export type Newsletter = typeof newsletter.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
