const { NotFoundError } = require("../../errors");
const ApplicationController = require("../ApplicationController");


// ------------------ Handle Get Root ------------------ //

describe("handleGetRoot", () => {
    it("should testing handleGetRoot (:", async () => {
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        const payloadResponse = {
            status: "OK",
            message: "BCR API is up and running!",
        };

        const applicationController = new ApplicationController();

        applicationController.handleGetRoot(mockRequest, mockResponse);

        // Asertion
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(payloadResponse);
    });
});

// ------------------ End Handle Get Root ------------------ //


// ------------------ Handle Not Found ------------------ //

describe("handleNotFound", () => {
    it("should call res.status(404) and res.json error", async () => {
        const mockRequest = {
            method: jest.fn().mockReturnThis(),
            url: jest.fn().mockReturnThis(),
        };

        const err = new NotFoundError(mockRequest.method, mockRequest.url);

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        const applicationController = new ApplicationController();
        applicationController.handleNotFound(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: {
                name: err.name,
                message: err.message,
                details: err.details,
            },
        });
    });
});

// ------------------ End Handle Not Found ------------------ //


// ------------------ Handle Error ------------------ //

describe("handleError", () => {
    it("should testing handleError function", async () => {
        const mockRequest = {};
        const mockNext = {};
        const mockResponseHandleError = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        }

        const err = new Error("Whoops!");

        const applicationController = new ApplicationController();
        applicationController.handleError(err, mockRequest, mockResponseHandleError, mockNext)


        // Assertion
        expect(mockResponseHandleError.status).toHaveBeenCalledWith(500);
        expect(mockResponseHandleError.json).toHaveBeenCalledWith({
            error: {
                name: err.name,
                message: err.message,
                details: err.details || null,
            },
        });
    });
});

// ------------------ End Handle Error ------------------ //


// ------------------  Get Offset From  Request ------------------ //

describe("getOffsetFromRequest", () => {
    it("should call res.status(500) and res.json with task instance", () => {
        const query = {
            page: 1,
            pageSize: 10,
        };

        const mockRequest = { query };

        const offset = ( query.page - 1 ) * query.pageSize;

        const applicationController = new ApplicationController();
        const result = applicationController.getOffsetFromRequest(mockRequest);

        expect(result).toBe(offset);
    });
});

// ------------------ End Get Offset From Request ------------------ //


// ------------------ Build Pagination Object ------------------ //

describe("buildPaginationObject", () => {
    it("should call res.status(500) and res.json with task instance", () => {
        const query = {
            page: 1,
            pageSize: 10,
        };

        const count = 0;

        const mockRequest = { query };

        const pageCount = Math.ceil(count / query.pageSize);

        const back = [{
            page: query.page,
            pageCount,
            pageSize: query.pageSize,
            count,
        }, ];

        const applicationController = new ApplicationController();
        const result = applicationController.buildPaginationObject(
            mockRequest,
            count,
        );

        expect(result).toStrictEqual(back[0]);
    });
});

// ------------------ End Build Pagination Object ------------------ //