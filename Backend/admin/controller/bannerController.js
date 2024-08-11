const fs = require('fs');
const Banner = require('../models/banner'); // Assuming you have a Banner model
// Assuming you have a Cloudinary upload utility

exports.createBanner = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const imageLocalPath = req.file.path;

      if (fs.existsSync(imageLocalPath)) {
        const imageUploadResult = await uploadOnCloudinary(imageLocalPath);

        if (imageUploadResult?.url) {
          imageUrl = imageUploadResult.url;
        } else {
          return res.status(400).json({
            error: "Image upload failed. Please try again.",
          });
        }

        // Optionally, delete the image from local after uploading
        fs.unlinkSync(imageLocalPath);
      } else {
        return res.status(400).json({
          error: `Image file not found at path: ${imageLocalPath}`,
        });
      }
    }

    // Create a new banner instance
    const newBanner = new Banner({
      images: imageUrl || req.body.images,
    });

    // Save the banner to the database
    const savedBanner = await newBanner.save();

    res.status(201).json({
      message: 'Banner created successfully',
      banner: savedBanner,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating banner',
      error: error.message,
    });
  }
};

  
  // Get all banners
  exports.getBanners = async (req, res) => {
    try {
      const banners = await Banner.find();
      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banners',
        error: error.message,
      });
    }
  };
  
  // Get a banner by ID
  exports.getBannerById = async (req, res) => {
    try {
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
      res.status(200).json(banner);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching banner',
        error: error.message,
      });
    }
  };
  
  // Update a banner by ID
  exports.updateBanner = async (req, res) => {
    try {
      const { images } = req.body;
  
      // Find the banner by ID and update
      const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.id,
        { images },
        { new: true, runValidators: true } // Return the updated banner
      );
  
      if (!updatedBanner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
  
      res.status(200).json({
        message: 'Banner updated successfully',
        banner: updatedBanner,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating banner',
        error: error.message,
      });
    }
  };
  
  // Delete a banner by ID
  exports.deleteBanner = async (req, res) => {
    try {
      const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
  
      if (!deletedBanner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }
  
      res.status(200).json({
        message: 'Banner deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting banner',
        error: error.message,
      });
    }
  };
  