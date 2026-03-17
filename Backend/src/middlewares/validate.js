export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,  // show all errors at once
        stripUnknown: true, // remove unknown fields
    });

    if (error) {
        const message = error.details.map(d => d.message).join(", ");
        return res.status(400).json({ message, success: false });
    }
    next();
};
