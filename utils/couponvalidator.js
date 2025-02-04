export const validateCoupon = (couponCode) => {
    const validCoupons = {
        "DISCOUNT10": 10,
        "PRINT50": 50,
        "WELCOME20": 20,
    };

    return validCoupons[couponCode] || 0; // Return discount percentage or 0 if invalid
};
