import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import * as CourseEnum from "./course.enum";

export interface ICourse extends BaseSchema {
    title: string;
    subtitle: string;
    keypoints: string[];
    description: string;
    tags: string[];

    brouchure?: string;
    thumbnail: string;

    instructor: mongoose.Schema.Types.ObjectId;
    ratingAndReviews: mongoose.Schema.Types.ObjectId[];
    category: mongoose.Schema.Types.ObjectId;
    price: {
        actualPrice: number;
        discountPercentage?: number;
        finalPrice: number;
    };
    language: CourseEnum.Language;
    duration: string;
    totalLectures: number;

    courseMode: CourseEnum.CourseMode;

    trailerVideo?: string;
    
    sections: mongoose.Schema.Types.ObjectId[];
    isDraft: boolean;
}

export interface ISection extends BaseSchema {
    title: string;
    description: string;
    subSections: mongoose.Schema.Types.ObjectId[];
    duration?: string;
}

export interface ISubSection extends BaseSchema {
    title: string;
    video?: string;
    pdf?: string;
    image?: string;
    resources?: string[];
    isPreview: boolean;
}

export interface IRatingAndReviews extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId;
    courseId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment?: string;
}

export interface IEnrollment extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId;
    courseId: mongoose.Schema.Types.ObjectId;
    enrolledAt: Date;
    expiresAt?: Date;
    progress: number;
    completedAt?: Date;
    isCompleted: boolean;
    certificate?: string;
    status: CourseEnum.Status;
}

export interface ICourseEnquiry extends BaseSchema {
    name: string;
    email: string;
    phone: string;
    education: string;
    intrestedCourse: string;
    status: CourseEnum.EnquiryStatus;
    whatsAppOptIn: boolean;
}

export interface ICourseLifeCycle extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId;
    allCourses: mongoose.Schema.Types.ObjectId[];
    DRAFT: mongoose.Schema.Types.ObjectId[];
    PUBLISHED: mongoose.Schema.Types.ObjectId[];
    UNPUBLISHED: mongoose.Schema.Types.ObjectId[];
    TERMINATED: mongoose.Schema.Types.ObjectId[];
}

