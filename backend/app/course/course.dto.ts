import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import * as CourseEnum from "./course.enum";

export interface ICourse extends BaseSchema {
    title: string;
    subtitle: string;
    keypoints: string[];
    description: string;
    tags: string[];
    whatWillYouLearn: string[];

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
    courseStatus: CourseEnum.CourseStatus;
}

export interface ISection extends BaseSchema {
    title: string;
    description: string;
    subSections: mongoose.Schema.Types.ObjectId[];
    duration?: string;
}

export interface ISubSection extends BaseSchema {
    title: string;
    video?: {
        link: string;
        duration: string;
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


