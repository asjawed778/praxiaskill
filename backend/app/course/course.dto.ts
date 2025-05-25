import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import * as CourseEnum from "./course.enum";

export interface ICourse extends BaseSchema {
    title: string;
    subtitle: string;
    keypoints?: string[];
    description: string;
    tags?: string[];
    whatWillYouLearn?: string[];

    brouchure?: string;
    thumbnail: string;

    instructor?: mongoose.Schema.Types.ObjectId;
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
    validity: CourseEnum.CourseValidity;
    courseMode: CourseEnum.CourseMode;
    prerequisites?: string[];
    courseLevel?: string;
    tools?: {
        name: string;
        url?: string;
    }[];
    faq?: {
        question: string;
        answer: string;
        resourceUrl?: string;
    }[];

    trailerVideo?: string;
    sections: mongoose.Schema.Types.ObjectId[];
    courseStatus: CourseEnum.CourseStatus;
}

export interface IUpdateCourseDetails extends Omit<ICourse, "_id" | "createdAt" | "updatedAt" | "sections" | "ratingAndReviews"> { }

export interface ISection extends BaseSchema {
    title: string;
    description?: string;
    assignments?: string[];
    projects?: string[];
    subSections: mongoose.Schema.Types.ObjectId[];
    duration?: string;
}

export interface ISubSection extends BaseSchema {
    title: string;
    description?: string;
    video?: {
        link: string;
        duration?: string;
    };
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
    ticketNo: string;
    name: string;
    email: string;
    phone: string;
    education: string;
    interestedCourse: string;
    status: CourseEnum.EnquiryStatus;
    whatsAppOptIn: boolean;
}

export interface IQna extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId;
    courseId: mongoose.Schema.Types.ObjectId;
    sectionId?: mongoose.Schema.Types.ObjectId;
    subSectionId?: mongoose.Schema.Types.ObjectId;
    question: {
        title: string;
        description?: string;
        createdAt: Date;
        updatedAt: Date;
    };
    answers?: {
        userId: mongoose.Schema.Types.ObjectId;
        answer: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    upvotes?: mongoose.Schema.Types.ObjectId[];
}

export interface ICreateQna extends Omit<IQna, "createdAt" | "updatedAt" | "_id" | "answers"> { }


