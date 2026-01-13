import peopleService from '../../services/peopleService.js';

// @desc    Get all people
// @route   GET /api/admin/people
// @access  Private/Admin
export const getAllPeople = async (req, res, next) => {
  try {
    const { category, isActive } = req.query;
    const people = await peopleService.getAll({ category, isActive });

    res.status(200).json({
      success: true,
      count: people.length,
      data: people
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single person
// @route   GET /api/admin/people/:id
// @access  Private/Admin
export const getPerson = async (req, res, next) => {
  try {
    const person = await peopleService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: person
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new person
// @route   POST /api/admin/people
// @access  Private/Admin
export const createPerson = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/people/${req.file.filename}`;
    }

    const person = await peopleService.create(req.body);

    res.status(201).json({
      success: true,
      data: person
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update person
// @route   PUT /api/admin/people/:id
// @access  Private/Admin
export const updatePerson = async (req, res, next) => {
  try {
    // Add image path if file was uploaded
    if (req.file) {
      req.body.image = `/uploads/people/${req.file.filename}`;
    }

    const person = await peopleService.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: person
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete person
// @route   DELETE /api/admin/people/:id
// @access  Private/Admin
export const deletePerson = async (req, res, next) => {
  try {
    await peopleService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Person deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
