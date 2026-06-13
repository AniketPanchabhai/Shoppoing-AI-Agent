/**
 * Tools for the Shopping Agent
 * Uses MongoDB instead of mock data
 */

const { Product, Order } = require('../models');

/**
 * SEARCH_PRODUCTS Tool
 * Searches products based on filters
 */
async function searchProducts(params = {}) {
  try {
    let query = {};

    // Apply filters
    if (params.brand) {
      query.brand = { $regex: params.brand, $options: 'i' };
    }

    if (params.category) {
      query.category = { $regex: params.category, $options: 'i' };
    }

    if (params.minPrice) {
      query.price = { ...query.price, $gte: params.minPrice };
    }

    if (params.maxPrice) {
      query.price = { ...query.price, $lte: params.maxPrice };
    }

    if (params.minRating) {
      query.rating = { $gte: params.minRating };
    }

    if (params.inStockOnly !== false) {
      query.inStock = true;
    }

    // Execute query
    console.log('Executing product search with query:', query);
    const results = await Product.find(query)
      .sort({ rating: -1 })
      .limit(params.limit || 5);

    return {
      success: true,
      count: results.length,
      products: results.map(p => ({
        id: p._id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        rating: p.rating,
        reviews: p.reviews,
        inStock: p.inStock
      }))
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * GET_PRODUCT_DETAILS Tool
 * Retrieves complete product information
 */
async function getProductDetails(params = {}) {
  try {
    const product = await Product.findById(params.productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    return {
      success: true,
      product: {
        id: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        specs: Object.fromEntries(product.specs || []),
        warranty: product.warranty,
        description: product.description
      },
      availability: product.inStock ? 'In Stock' : 'Out of Stock'
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * ANALYZE_REVIEWS Tool
 * Analyzes product reviews and sentiment
 */
async function analyzeReviews(params = {}) {
  try {
    const product = await Product.findById(params.productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    // Mock review analysis (can be enhanced with real review data)
    const mockReviews = {
      positive: ['Great quality', 'Excellent display', 'Fast performance', 'Good value'],
      negative: ['Expensive', 'Heat issues after 2 hours'],
      overall: 'Highly recommended'
    };

    return {
      success: true,
      productName: product.name,
      totalReviews: product.reviews,
      rating: product.rating,
      sentiment: {
        positive: 85,
        neutral: 10,
        negative: 5
      },
      topPros: mockReviews.positive,
      topCons: mockReviews.negative,
      summary: mockReviews.overall
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * CHECK_INVENTORY Tool
 * Checks stock availability
 */
async function checkInventory(params = {}) {
  try {
    const product = await Product.findById(params.productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    return {
      success: true,
      productName: product.name,
      inStock: product.inStock,
      quantity: product.quantity || 0,
      estimatedDelivery: product.inStock ? '2-3 days' : 'Pre-order available'
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * CREATE_ORDER Tool
 * Creates an order
 */
async function createOrder(params = {}) {
  try {
    const product = await Product.findById(params.productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (!product.inStock) {
      return { success: false, error: 'Product is out of stock' };
    }

    const quantity = params.quantity || 1;
    const totalPrice = product.price * quantity;
    const orderId = `ORD-${Date.now()}`;

    // Create order in database
    const order = new Order({
      orderId: orderId,
      productId: product._id,
      productName: product.name,
      quantity: quantity,
      unitPrice: product.price,
      totalPrice: totalPrice,
      estimatedDelivery: '2-3 business days',
      status: 'confirmed'
    });

    await order.save();

    // Update product quantity
    product.quantity -= quantity;
    if (product.quantity <= 0) {
      product.inStock = false;
    }
    await product.save();

    return {
      success: true,
      orderId: orderId,
      productName: product.name,
      quantity: quantity,
      unitPrice: product.price,
      totalPrice: totalPrice,
      estimatedDelivery: '2-3 business days',
      status: 'Order Confirmed',
      confirmationMessage: `Your order ${orderId} has been successfully placed!`
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * ANALYZE_IMAGE Tool
 * Analyzes uploaded images to find similar products
 */
async function analyzeImage(params = {}) {
  try {
    if (!params.imageData) {
      return { success: false, error: 'No image provided' };
    }

    // Simulate category detection from image
    const mockAnalysis = {
      category: 'Electronics',
      detectedItems: ['TV', 'Smart Screen'],
      suggestedCategory: 'TVs'
    };

    // Find similar products
    const similarProducts = await Product.find({
      category: mockAnalysis.suggestedCategory
    }).limit(3);

    return {
      success: true,
      detectedCategory: mockAnalysis.suggestedCategory,
      detectedItems: mockAnalysis.detectedItems,
      similarProducts: similarProducts.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        rating: p.rating
      }))
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  searchProducts,
  getProductDetails,
  analyzeReviews,
  checkInventory,
  createOrder,
  analyzeImage
};
