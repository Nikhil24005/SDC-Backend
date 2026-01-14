import galleryService from '../../services/galleryService.js';

// @desc    Get all gallery items
// @route   GET /api/public/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const gallery = await galleryService.getAll({ category, isActive: true });

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
// @route   GET /api/public/gallery/:id
// @access  Public
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
