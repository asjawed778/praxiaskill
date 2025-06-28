import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import * as CourseEnum from "./course.enum";

export interface ICourse extends BaseSchema {
    title: string;
    slug: string;
    subtitle: string;
    keypoints?: string[];
    description: string;
    tags?: string[];
    whatWillYouLearn?: string[];

    brouchure?: string;
    thumbnail: string;

    instructor?: mongoose.Schema.Types.ObjectId;
    category: mongoose.Schema.Types.ObjectId;
    price: {
        actualPrice: number;
        discountPercentage?: number;
        finalPrice: number;
    };
    language: CourseEnum.Language;
    duration?: string;
    totalLiveSession?: string;
    recordedContent?: string;
    totalLectures?: number;
    validity: CourseEnum.CourseValidity;
    courseMode: CourseEnum.CourseMode;
    prerequisites?: string;
    courseLevel?: string;
    tools?: {
        name: string;
        iconName?: string;
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

export interface IUpdateCourseCurriculum {
    sections: {
        _id?: string;
        title: string;
        description?: string;
        assignments?: string[];
        projects?: string[];
        subSections: {
            _id?: string;
            title: string;
            description?: string;
        }[];
        duration?: string;
    }[];
}

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
    education?: string;
    interestedCourse?: string;
    statusLogs: {
        status: CourseEnum.EnquiryStatus;
        timeStamp: Date;
    };
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

export interface ICourseNotes extends BaseSchema {
    userId: mongoose.Types.ObjectId;
    courseId?: mongoose.Types.ObjectId;
    sectionId?: mongoose.Types.ObjectId;
    subSectionId?: mongoose.Types.ObjectId;
    notes: string;
}
export interface ICourseNotesCreate extends Omit<ICourseNotes, "createdAt" | "updatedAt" | "_id"> { }

export interface ICourseOverview extends BaseSchema {
    courseId: mongoose.Types.ObjectId;
    sectionId: mongoose.Types.ObjectId;
    subSectionId: mongoose.Types.ObjectId;
    overview: string;
}

export interface ICourseOverviewCreate extends Omit<ICourseOverview, "createdAt" | "updatedAt" | "_id"> { }


export interface ICourseAnnouncement extends BaseSchema {
    courseId: mongoose.Types.ObjectId;
    title: string;
    message: string;
}



export interface EnquiryStatusCount {
    _id: string;
    count: number;
}

export interface EnquiryAnalyticsResult {
    totalEnquiries: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastSixMonths: number;
    thisYear: number;
    byStatus: Record<string, number>;
}
