const CarController = require("../CarController");
const { Car } = require("../../models")


// ------------------ Handle List Cars ------------------ //



// ------------------ End Handle List Cars ------------------ //


// ------------------ Handle Get Car ------------------ //

describe("handleGetCar", () => {
    it("should testing handleGetCar function", async () => {

        const payloadCar = {
            name: "avanza veloz",
            price: 359000,
            size: "medium",
            image: "https://toyotabatangas.com.ph/wp-content/uploads/2019/09/avanza-silver.png",
            isCurrentlyRented: false,
        };

        const mockRequest = {
            params: {
                id: 1
            }
        };

        const mockCar = new Car({ payloadCar });

        const mockCarModel = {}

        mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar)
        
        const app = new CarController({ carModel: mockCarModel });

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await app.handleGetCar(mockRequest, mockResponse);
        const getCarData = await app.getCarFromRequest(mockRequest);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(getCarData)
    });
});

// ------------------ End Handle Get Car ------------------ //


// ------------------ Handle Create Car ------------------ //
// ------------------ End Handle Create Car ------------------ //