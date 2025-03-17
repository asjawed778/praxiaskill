import React, { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

const Category = () => {
  // Sample initial data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Web Development', courses: 5 },
    { id: 2, name: 'Mobile App Development', courses: 8 },
    { id: 3, name: 'Data Science', courses: 12 },
    { id: 4, name: 'Machine Learning', courses: 6 },
    { id: 5, name: 'UI/UX Design', courses: 4 },
    { id: 6, name: 'Cloud Computing', courses: 7 },
    { id: 7, name: 'DevOps', courses: 5 },
    { id: 8, name: 'Blockchain', courses: 3 },
    { id: 9, name: 'Artificial Intelligence', courses: 9 },
    { id: 10, name: 'Cybersecurity', courses: 11 },
    { id: 11, name: 'Game Development', courses: 6 },
    { id: 12, name: 'Big Data', courses: 8 },
    { id: 13, name: 'IoT', courses: 4 },
    { id: 14, name: 'Augmented Reality', courses: 3 },
    { id: 15, name: 'Virtual Reality', courses: 5 },
  ]);

  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', courses: 0 });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Delete confirmation state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Validation function
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Category name is required';
      } else if (value.trim().length < 3) {
        error = 'Category name must be at least 3 characters';
      } else if (value.trim().length > 50) {
        error = 'Category name must be less than 50 characters';
      } else {
        // Check for duplicate name (only for new categories or if name changed)
        const isDuplicate = categories.some(cat => 
          cat.name.toLowerCase() === value.trim().toLowerCase() && 
          (isAddingCategory || (isEditingCategory && cat.id !== currentCategory.id))
        );
        
        if (isDuplicate) {
          error = 'Category name already exists';
        }
      }
    } else if (name === 'courses') {
      if (value === '') {
        error = 'Number of courses is required';
      } else if (isNaN(value) || parseInt(value) < 0) {
        error = 'Number of courses must be a positive number';
      } else if (parseInt(value) > 999) {
        error = 'Number of courses must be less than 1000';
      }
    }
    
    return error;
  };

  // Handle field change with validation
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    let newValue = name === 'courses' ? (value === '' ? '' : parseInt(value) || 0) : value;
    
    setCurrentCategory({
      ...currentCategory,
      [name]: newValue
    });
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    const error = validateField(name, newValue);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};
    newErrors.name = validateField('name', currentCategory.name);
    newErrors.courses = validateField('courses', currentCategory.courses);
    
    setErrors(newErrors);
    setTouched({ name: true, courses: true });
    
    return !newErrors.name && !newErrors.courses;
  };

  // Handler functions
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditingCategory(true);
    setErrors({});
    setTouched({});
  };

  const confirmDeleteCategory = (id) => {
    const categoryToDelete = categories.find(category => category.id === id);
    setCategoryToDelete(categoryToDelete);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(category => category.id !== categoryToDelete.id);
    setCategories(updatedCategories);
    
    // If deleting the last item of a page, go to previous page
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    
    // Close the confirmation dialog
    setShowDeleteConfirmation(false);
    setCategoryToDelete(null);
  };

  const handleAddCategory = () => {
    setCurrentCategory({ id: null, name: '', courses: 0 });
    setIsAddingCategory(true);
    setErrors({});
    setTouched({});
  };

  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateForm()) {
      return;
    }
    
    if (isEditingCategory) {
      // Update existing category
      const updatedCategories = categories.map(category => 
        category.id === currentCategory.id ? currentCategory : category
      );
      setCategories(updatedCategories);
      setIsEditingCategory(false);
    } else {
      // Add new category
      const newId = categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
      setCategories([...categories, { ...currentCategory, id: newId }]);
      setIsAddingCategory(false);
    }
    
    // Reset form and validation states
    setCurrentCategory({ id: null, name: '', courses: 0 });
    setErrors({});
    setTouched({});
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseForm = () => {
    setIsAddingCategory(false);
    setIsEditingCategory(false);
    setCurrentCategory({ id: null, name: '', courses: ''});
    setErrors({});
    setTouched({});
  };

  // Render category form (add/edit)
  const renderCategoryForm = () => {
    return (
      <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-gray-100 p-6 rounded-lg w-[980px] max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {isEditingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleCategoryFormSubmit} noValidate>
            <div className="mb-4">
              <label className="block mb-2">Category Name</label>
              <input
                type="text"
                name="name"
                className={`w-full border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                value={currentCategory.name}
                onChange={handleFieldChange}
                onBlur={() => setTouched({...touched, name: true})}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <input
                type="text"
                name="courses"
                className={`w-full h-20 border ${errors.courses && touched.courses ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                onChange={handleFieldChange}
                onBlur={() => setTouched({...touched, courses: true})}
                min=""
              />
              {errors.courses && touched.courses && (
                <p className="text-red-500 text-sm mt-1">{errors.courses}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-600 border rounded"
                onClick={handleCloseForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 w-20 bg-red-600 text-white rounded disabled:bg-blue-300"
                disabled={!!errors.name || !!errors.courses}
              >
                {isEditingCategory ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render delete confirmation dialog
  const renderDeleteConfirmation = () => {
    if (!categoryToDelete) return null;
    
    return (
      <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold">Confirm Deletion</h2>
          </div>
          
          <p className="mb-6">
            Are you sure you want to delete the category "{categoryToDelete.name}"? 
            
          </p>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => {
                setShowDeleteConfirmation(false);
                setCategoryToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleDeleteCategory}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl"></h2>
        <button
          className="flex items-center gap-2 border text-white bg-red-600 border-gray-300 rounded-md px-4 py-2"
          onClick={handleAddCategory}
        >
          <Plus size={20} /> Add  Category
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-r border-gray-300 p-3 text-left">Serial No</th>
              <th className="border-b border-r border-gray-300 p-3 text-left">Category Name</th>
              <th className="border-b border-r border-gray-300 p-3 text-left">No of Course</th>
              <th className="border-b border-gray-300 p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category, index) => (
              <tr key={category.id} className="border-b border-gray-300 last:border-b-0">
                <td className="border-r border-gray-300 p-3">{indexOfFirstItem + index + 1}</td>
                <td className="border-r border-gray-300 p-3">{category.name}</td>
                <td className="border-r border-gray-300 p-3 text-center">{category.courses}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button onClick={() => handleEditCategory(category)}>
                    <Pencil size={20} className='text-blue-600 cursor-pointer hover:text-blue-900' />
                  </button>
                  <button onClick={() => confirmDeleteCategory(category.id)}>
                    <Trash2 size={20} className='text-red-600 cursor-pointer hover:text-red-800' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, categories.length)} of {categories.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="border rounded w-10 h-10 flex items-center justify-center">
            {currentPage}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {(isAddingCategory || isEditingCategory) && renderCategoryForm()}
      {showDeleteConfirmation && renderDeleteConfirmation()}
    </div>
  );
};

export default Category;