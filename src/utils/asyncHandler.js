const asyncHandler = (fn) => {
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}
export { asyncHandler }
//Using Try Catch
/*
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};
*/
