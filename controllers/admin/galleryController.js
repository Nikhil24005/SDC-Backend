import galleryService from '../../services/galleryService.js';

// @desc    Get all gallery items
// @route   GET /api/admin/gallery
// @access  Private/Admin
export const getAllGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const gallery = await galleryService.getAll({ category });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single gallery item
// @route   GET /api/admin/gallery/:id
// @access  Private/Admin
export const getGalleryItem = async (req, res, next) => {
  try {
    const item = await galleryService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new gallery item
// @route   POST /api/admin/gallery
// @access  Private/Admin
export const createGalleryItem = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/gallery/${req.file.filename}`;
    }

    const item = await galleryService.create(req.body);

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item
// @route   PUT /api/admin/gallery/:id
// @access  Private/Admin
export const updateGalleryItem = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/gallery/${req.file.filename}`;
    }

    const item = await galleryService.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/admin/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res, next) => {
  try {
    await galleryService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
