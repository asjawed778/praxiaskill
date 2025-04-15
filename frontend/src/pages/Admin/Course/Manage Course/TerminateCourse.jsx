import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetAllPublishedCourseQuery, useTerminateCourseMutation } from '../../../../services/course.api';

const TerminateCourseModal = ({ open, onClose, course }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [terminateCourse] = useTerminateCourseMutation();
  const { refetch } = useGetAllPublishedCourseQuery();

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      console.log("Course id: ",course._id);
      
      await terminateCourse({courseId: course._id}).unwrap(); 
      toast.success(`Course terminated successfully`);
      await refetch(); 
      onClose();      
    } catch (error) {
      console.error('Termination failed:', error);
      toast.error("Failed to terminate course");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0  bg-opacity-40 backdrop-blur-xs"></div>  
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative z-10">
        <h2 className="text-lg font-semibold mb-4">Confirm Termination</h2>
        <p className="mb-6">Are you sure you want to terminate this course <span className='font-semibold'>{course.title}{'.'}</span></p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 hover:cursor-pointer"
          >
            {isLoading ? 'Terminating...' : 'Yes, Terminate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminateCourseModal;
