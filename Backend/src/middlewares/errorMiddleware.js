const handleGenericErrors = (error, req, res, next) => {
    try {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong..Please try again !!";
        return res.status(statusCode).json({
            message: message
        })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong..!!" })
    }
}

export default handleGenericErrors;