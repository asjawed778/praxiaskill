import mongoose from 'mongoose';
import { IQna } from './course.dto';

const QnaSchema = new mongoose.Schema<IQna>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    },
    subSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
    },
    question: {
        title: { type: String, required: true },
        description: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    answers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            answer: {
                type: String,
                required: true,
            },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        }
    ],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
});

export default mongoose.model<IQna>('Qna', QnaSchema);
